import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, TextField } from '@mui/material';

const DeliveryInfoPage = () => {
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8000/Deliveryinfofromorder/Deliveryinfofromorder")
            .then(res => {
                setDeliveryInfo(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching delivery information:', err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/DeleteDeliveryinfofromorder/DeleteDeliveryinfofromorder/${id}`);
            if (response.status === 200) {
                // Remove the deleted item from the deliveryInfo state
                setDeliveryInfo(deliveryInfo.filter(item => item._id !== id));
                console.log('Delivery information deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting delivery information:', error);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Delivery Information</h2>
                    {deliveryInfo.map(deliveryInfo => (
                        <div key={deliveryInfo._id}>
                            <p>{deliveryInfo.firstName} {deliveryInfo.lastName}</p>
                            <p>Email: {deliveryInfo.email}</p>
                            <p>phoneNumber: {deliveryInfo.phoneNumber}</p>
                            <p>address: {deliveryInfo.address}</p>
                            <p>city: {deliveryInfo.city}</p>
                            <p>totalPrice: {deliveryInfo.totalPrice}</p>
                            {/* Display other delivery info fields as needed */}
                            <Button onClick={() => handleDelete(deliveryInfo._id)}>Delete</Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryInfoPage;
