import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Navigate, useParams } from "react-router-dom";


function VehicleUpdateDelete() {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [millage, setMillage] = useState('');
    const [availability, setAvailability] = useState('available');

    useEffect(() => {
        axios.get(`http://localhost:8000/getVehicle/getVehicle/${id}`)
            .then(result => {
                setName(result.data.name);
                setModel(result.data.model);
                setMillage(result.data.millage);
                setAvailability(result.data.availability);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        axios.put(`http://localhost:8000/VehicleUpdateDelete/VehicleUpdateDelete/${id}`, { name, model, millage, availability })
            .then(result => {
                console.log(result)
                
                setNavigate(true);

            })
            .catch(err => console.log(err, id))

    };

    const [navigate, setNavigate] = useState(false); // State to manage navigation

    if (navigate) {
        return <Navigate to="/VehicleView" />; // Navigate when state is true
    }

    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={6}>
                    <div>
                        <Typography variant="h4" gutterBottom align="center">Update Vehicle</Typography>
                        <form onSubmit={handleSubmit} action="/">
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
                                label="Vehicle Model"
                                variant="outlined"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Mileage"
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
        </Container>
    );
}

export default VehicleUpdateDelete;
