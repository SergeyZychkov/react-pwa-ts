import apiClient from './apiClient';

export const getFilesFromContentFolder = async () => {
    return await apiClient.get('api/content/GetFilesFromContentFolder');
}

export const getWeatherForecast = async () => {
    return await apiClient.get('api/weatherforecast');
}

export const getTestValue = async () => {
    return await apiClient.get('api/Test/GetTestValue');
}

export const saveTestValue = async (newValue: string) => {
    return await apiClient.post('api/Test/SaveTestValue', { value: newValue });
}

export const uploadContent = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post('api/content/upload', formData);
}

export const subscribeToNotifications = async (newSub: PushSubscription) => {
    return await apiClient.post('api/PushNotification/Subscribe', newSub);
}

export const sendNotification = async (notification: string) => {
    return await apiClient.post('api/PushNotification/SendNotification', {
        content: notification, 
        openUrl:"/", 
        title: 'Test Push'
    });
}