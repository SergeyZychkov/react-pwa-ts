import apiClient from './apiClient';

export const getFilesFromContentFolder = async () => {
    return await apiClient.get('/content/GetFilesFromContentFolder');
}

export const getWeatherForecast = async () => {
    return await apiClient.get('/weatherforecast');
}

export const getTestValue = async () => {
    return await apiClient.get('/Test/GetTestValue');
}

export const saveTestValue = async (newValue: string) => {
    return await apiClient.post('/Test/SaveTestValue', { value: newValue });
}

export const uploadContent = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await apiClient.post('/content/upload', formData);
}

export const subscribeToNotifications = async (newSub: PushSubscription) => {
    return await apiClient.post('/PushNotification/Subscribe', newSub);
}

export const sendNotification = async (notification: string) => {
    return await apiClient.post('/PushNotification/SendNotification', {
        content: notification, 
        openUrl:"/", 
        title: 'Test Push'
    });
}