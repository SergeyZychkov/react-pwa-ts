import { useState, useEffect } from 'react';
import './App.css';
import apiClient from '../utilities/apiService';

export default function ApiInteraction() {
    const [testValue, setTestValue] = useState<string>('');
    const [newValue, setNewValue] = useState<string>('');

    const getTestValueEndpoint = '/Test/GetTestValue';
    
    useEffect(() => {
        populateTestValue();
    }, []);
    
    var networkDataReceived = false;

    async function populateTestValue() {
        const {data} = await apiClient.get(getTestValueEndpoint);
        networkDataReceived = true;
        setTestValue(data);
    }
    
    function saveTestValueButton() {

        networkDataReceived = false;
        
        apiClient.post('/Test/SaveTestValue',
            { value: newValue }
            )
        .then(function() {
            if ('caches' in window) {
                caches.match(getTestValueEndpoint)
                    .then(function(response) {
                        if (response) {
                            return response.text();
                        }
                    })
                    .then(function(data) {
                        if (!networkDataReceived && data) {
                            setTestValue(data);
                        }
                    });
            }

            populateTestValue();

        });
    }

    function handleTestValueInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewValue(event.target.value);
    }

    return (
        <div>
            <p>3. POST call to change data on server (it will use partial rendering to update value in previous step):</p>
            <input id="testValueInput" onChange={handleTestValueInputChange} /> 
            <button id="saveTestValueButton" onClick={saveTestValueButton}>
                Save test value
            </button>

             <p>4. GET call to fetch stored data from server: </p>
            <input id="storedTestValueInput" value={testValue} disabled />
        </div>
    );
};