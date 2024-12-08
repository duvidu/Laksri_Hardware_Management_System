import React, { useState, useEffect } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useParams, Navigate } from "react-router-dom";

function DeliveryUpdateDelete() {
    const { id } = useParams();

    const [shippingAddress, setShippingAddress] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [deliveryCost, setDeliveryCost] = useState('');
    const [estimateTime, setEstimateTime] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8000/getDelivery/getDelivery/${id}`)
            .then(result => {
                setShippingAddress(result.data.shippingAddress);
                setSelectedVehicle(result.data.selectedVehicle);
                setDeliveryCost(result.data.deliveryCost);
                setEstimateTime(result.data.estimateTime);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/DeliveryUpdateDelete/DeliveryUpdateDelete/${id}`, { shippingAddress, selectedVehicle, deliveryCost, estimateTime })
            .then(result => {
                console.log(result);
                // Assuming you're using react-router-dom for navigation
                // You need to use state to navigate programmatically
                // Use <Navigate /> component directly inside JSX is not possible
                // Instead, manage navigation state and conditionally render <Navigate /> component
                // Here's an example of how to do it:
                setNavigate(true);
            })
            .catch(err => console.log(err));
    };

    const [navigate, setNavigate] = useState(false); // State to manage navigation

    if (navigate) {
        return <Navigate to="/DeliveryView" />; // Navigate when state is true
    }

    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={8} md={6}>
                    <div>
                        <Typography variant="h4" gutterBottom align="center">Update Delivery</Typography>
                        <form onSubmit={handleSubmit} action="/">
                            <TextField
                                fullWidth
                                label="Shipping Address"
                                variant="outlined"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Selected Vehicle"
                                variant="outlined"
                                value={selectedVehicle}
                                onChange={(e) => setSelectedVehicle(e.target.value)}
                                margin="normal"
                                disabled
                            />
                            <TextField
                                fullWidth
                                label="Delivery Cost"
                                variant="outlined"
                                value={deliveryCost}
                                onChange={(e) => setDeliveryCost(e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Estimate Time"
                                variant="outlined"
                                value={estimateTime}
                                onChange={(e) => setEstimateTime(e.target.value)}
                                margin="normal"
                                required
                            />
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

export default DeliveryUpdateDelete;
