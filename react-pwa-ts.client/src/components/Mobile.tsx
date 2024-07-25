import { useState } from "react";
import * as ApiService from '../utilities/api/apiService';

const Mobile = () => {
    const [userLocation, setUserLocation] = useState('');
    const [notification, setNotification] = useState('');
    
    function handleGetLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setUserLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
            },
            null,
            { enableHighAccuracy: true, maximumAge: 0 });
        } else {
            setUserLocation("Geolocation not supported");
        }
    }
    
    function askForNotificationPermission() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            Notification.requestPermission(function(result) {
                console.log('User Choice', result);
                if (result !== 'granted') {
                    console.log('No notification permission granted!');
                } else {
                    configurePushSub();
                }
            });
        }
    }

    function displayConfirmNotification() {
        if ('serviceWorker' in navigator) {

            let options: NotificationOptions = {
                body: 'You successfully subscribed to our Notification service!',
                icon: '/logo192.png',
                //image: '/src/images/cookie.jpg',
                dir: 'ltr',
                lang: 'en-US',
                //vibrate: [100, 50, 200],
                badge: '/logo192.png',
                tag: 'confirm-notification'
                //renotify: true,
                //actions: [
                //    { action: 'confirm', title: 'Okay', icon: '/src/images/icons/logo192.png' },
                //    { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/logo192.png' }
                //]
            };

            navigator.serviceWorker.ready
                .then(function(swreg) {
                    swreg.showNotification('Successfully subscribed!', 
                        options);
                });
        }
    }

function configurePushSub() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    let reg: ServiceWorkerRegistration;

    navigator.serviceWorker.ready
        .then(function(swreg) {
            reg = swreg;
            return swreg.pushManager.getSubscription();
        })
        .then(function(sub) {
            if (!sub) {
                var vapidPublicKey = 'BK301jmlPtPxS_ivFz4Bdi8dpCyLF0KpN1Ij_5nh5ktTb8Le8amZRuzH0JMP8ZXniBth6kse2BMQYXV8rBlFTe0';
                var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey
                });
            } else {
                // We have a subscription
            }
        })
        .then(function(newSub) {
            if (newSub) {
                return ApiService.subscribeToNotifications(newSub);
            }
        })
        .then(function(res) {
            if (res) {
                displayConfirmNotification();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

function urlBase64ToUint8Array(base64String: string) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function notificationInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNotification(event.target.value);
}

async function sendNotification() {
    await ApiService.sendNotification(notification)
        .then(function() {
            setNotification('');
        });
}

    return (
        <div>
            <div>
                <button id="getLocationButton" onClick={handleGetLocation}>Get current user location</button>
                {userLocation && <p>current user location: {userLocation}</p>}
            </div>

            <div>
                <button id="enableNotificationButton" onClick={askForNotificationPermission} >Enable PUSH notifications</button>
                <p>text of notification:</p>
                <input id="notificationInput" onChange={notificationInputChange} /> 
                <button id="sendNotificationButton" onClick={sendNotification}>
                    Send notification
                </button>
            </div>
        </div>
    );
};

export default Mobile;