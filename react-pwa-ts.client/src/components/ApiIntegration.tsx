import { useEffect, useState, Suspense, lazy } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {WeatherForecast} from '../shared/api/toy-app/model/weatherForecast';
import {useGetWeatherForecast} from '../shared/api/toy-app/weather-forecast/weather-forecast';

const ApiInteraction = lazy(() => delayForDemo(import('./ApiInteraction')));

function delayForDemo(promise: any) {
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    }).then(() => promise);
}

const columns: GridColDef<(WeatherForecast)>[] = [
    { field: 'date', headerName: 'Date', width: 90 },
    {
        field: 'temperatureC',
        headerName: 'Temp. (C)',
        width: 150
    },
    {
        field: 'temperatureF',
        headerName: 'Temp. (F)',
        width: 150
    },
    {
        field: 'summary',
        headerName: 'Summary',
        type: 'number',
        width: 110
    }
];

function getRowId(row: WeatherForecast) {
    return row.date?.toString() ?? '';
}

export default function ApiIntegration() {
    const [forecasts, setForecasts] = useState<WeatherForecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);
    
    async function populateWeatherData() {
        const { data } = await useGetWeatherForecast();
        setForecasts(data);
    }

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :     <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                      rows={forecasts}
                      getRowId={getRowId}
                      columns={columns}
                      initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                  />
              </Box>;

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