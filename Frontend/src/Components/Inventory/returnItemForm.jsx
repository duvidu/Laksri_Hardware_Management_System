import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const ReturnItemForm = () => {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [returnType, setReturnType] = useState('Defective Item');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [inventoryItems, setInventoryItems] = useState([]);

    //fetch inventory items for auto suggestion
    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/inventory');
                const data = await response.json();
                setInventoryItems(data);
            } catch (error) {
                console.error('Error fetching inventory items:', error);
            }
        };

        fetchInventoryItems();
    }, []);

    const handleReturnItemForm = async (e) => {
        e.preventDefault();

        try {
            const returnItem = { name, serialNumber, returnType, description };
            const response = await fetch('http://localhost:8000/returnItem', {
                method: 'POST',
                body: JSON.stringify(returnItem),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                //update inventory quantity 
                const itemToUpdate = inventoryItems.find(item => item.name === name);
                const updatedQuantity = itemToUpdate.quantity - 1;
                await fetch(`http://localhost:8000/inventory/${itemToUpdate._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ quantity: updatedQuantity }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Reset form fields
                setName('');
                setSerialNumber('');
                setDescription('');
                console.log('New return item added', json);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing request');
        }
    };

    return (
        <form className="newItem-form" onSubmit={handleReturnItemForm}>
            <Grid container spacing={0.8}>
                <Grid item xs={12}>
                    <InputLabel>Item Name</InputLabel>
                    <Autocomplete
                        value={name}
                        onChange={(event, newValue) => {
                            setName(newValue);
                        }}
                        inputValue={name}
                        onInputChange={(event, newInputValue) => {
                            setName(newInputValue);
                        }}
                        options={inventoryItems.map((item) => item.name)}
                        renderInput={(params) => <TextField {...params} required />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Serial/Unique Number"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel>Return Reason</InputLabel>
                    <Select
                        value={returnType}
                        onChange={(e) => setReturnType(e.target.value)}
                        required
                        fullWidth
                    >
                        <MenuItem value="Package Damage">Package Damage</MenuItem>
                        <MenuItem value="Defective Item">Defective Item</MenuItem>
                        <MenuItem value="Quality Concern">Quality Concern</MenuItem>
                        <MenuItem value="Missing Parts or Components">Missing Parts or Components</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Note (Optional)</InputLabel>
                        <TextareaAutosize
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            minRows={3}
                            style={{ width: '100%' }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Add Item
                    </Button>
                </Grid>
            </Grid>
            {error && <Typography color="error">Error: {error}</Typography>}
        </form>
    );
};

export default ReturnItemForm;
