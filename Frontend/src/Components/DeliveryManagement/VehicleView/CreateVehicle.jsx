import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateVehicle() {
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [millage, setMillage] = useState('');
    const [availability, setAvailability] = useState('available'); // Default value
    const [modelError, setModelError] = useState(''); // State variable for model error
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate model format
        const modelRegex = /^[A-Za-z]{2}-\d{4}$/;
        if (!modelRegex.test(model)) {
            // Set error message for invalid model format
            setModelError("Invalid model format. It should be two characters followed by a hyphen and four digits.");
            return;
        }

        // Check if millage is an integer
        if (!Number.isInteger(Number(millage))) {
            // Show toast message for invalid millage
            toast.error("Millage must be an integer");
            return;
        }

        axios.post('http://localhost:8000/CreateVehicle/CreateVehicle', { name, model, millage, availability })
            .then(res => {
                toast.success("Vehicle Record created successfully!");
                setTimeout(() => {
                    navigate('/VehicleView');
                }, 3000); // 3000 milliseconds = 3 seconds
            })
            .catch(err => console.log(err));
    };

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    const handleModelChange = (e) => {
        // Clear model error when the user starts typing in the model input
        setModelError('');
        setModel(e.target.value);
    };

    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={6}>
                    <div>
                        <Typography variant="h4" gutterBottom align="center">Add Vehicle</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Vehicle Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Vehicle Model (AA-1243)"
                                variant="outlined"
                                value={model}
                                onChange={handleModelChange}
                                margin="normal"
                                required
                                error={!!modelError} // Set error state based on modelError
                                helperText={modelError} // Display error message if modelError is not empty
                            />
                            <TextField
                                fullWidth
                                label="Millage"
                                variant="outlined"
                                value={millage}
                                onChange={(e) => setMillage(e.target.value)}
                                margin="normal"
                                required
                            />
                            <FormControl component="fieldset" margin="normal" fullWidth>
                                <Typography variant="subtitle1" gutterBottom>Select Availability:</Typography>
                                <RadioGroup
                                    row
                                    aria-label="availability"
                                    name="availability"
                                    value={availability}
                                    onChange={handleAvailabilityChange}
                                >
                                    <FormControlLabel value="available" control={<Radio />} label="Available" />
                                    <FormControlLabel value="notAvailable" control={<Radio />} label="Not Available" />
                                </RadioGroup>
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
    );
}

export default CreateVehicle;
