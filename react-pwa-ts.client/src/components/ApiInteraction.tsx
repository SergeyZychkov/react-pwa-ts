import { useState } from 'react';
import './App.css';
import * as ApiService from '../utilities/api/apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export default function ApiInteraction() {
    const [newValue, setNewValue] = useState<string>('');

    // Access the client
    const queryClient = useQueryClient();
    
    const testValueQuery  = useQuery({
        queryKey: ['testValue'],
        queryFn: async () =>
            await ApiService.getTestValue().then((res) => { return res.data; }
            )
    });

    const testValueMutation = useMutation({
        mutationFn: ApiService.saveTestValue,
        onSuccess: () => {
            const queryOptions: Object = { queryKey: ['testValue'] };
            // Invalidate and refetch
            queryClient.invalidateQueries(queryOptions);
        }
    });
        
    function saveTestValueButton() {
        testValueMutation.mutate(newValue);
    }

    function handleTestValueInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewValue(event.target.value);
    }

    if (testValueQuery.isPending) {
        return <span>Loading...</span>;
    }

    if (testValueQuery.isError) {
        return <span>Error: {testValueQuery.error.message}</span>;
    }

    return (
        <div>
            <p>3. POST call to change data on server (it will use partial rendering to update value in previous step):</p>
            <Input id="testValueInput" onChange={handleTestValueInputChange} /> 
            <Button onClick={saveTestValueButton} variant="outlined">
                Save test value
            </Button>

             <p>4. GET call to fetch stored data from server: </p>
            <Input id="storedTestValueInput" value={testValueQuery.data} disabled />
        </div>
    );
};