import { useEffect, useState, Suspense, lazy } from 'react';
import apiClient from '../utilities/apiService';

const ApiInteraction = lazy(() => delayForDemo(import('./ApiInteraction')));

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function delayForDemo(promise: any) {
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    }).then(() => promise);
}

export default function ApiIntegration() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);
    
    async function populateWeatherData() {
        const { data } =  await apiClient.get('/weatherforecast');
        setForecasts(data);
    }

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <p>1. Demo for caching data (we fetch weather data only once):</p>
            {contents}
            <p>2. Demo for lazy loading (delay = 1.5 seconds):</p>
             
            <Suspense fallback={<p><i>Loading...</i></p>}>
                <ApiInteraction></ApiInteraction>
            </Suspense>
        </div>
    );
};