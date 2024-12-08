import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/material';
import {
    BsFillArchiveFill, BsFillGrid3X2GapFill,
    BsFillCaretDownFill
} from "react-icons/bs";

import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


function PopupHome() {
    const [deliveryCount, setDeliveryCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/DeliveryView/DeliveryView")
            .then(res => {
                setDeliveryCount(res.data.length);
            })
            .catch(err => console.log(err));

        axios.get("http://localhost:8000/VehicleView/VehicleView")
            .then(res => {
                setVehicleCount(res.data.length);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/Deliveryinfofromorder/Deliveryinfofromorder")
            .then(res => {
                setDeliveryInfo(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const data = [
        { name: 'Deliveries', count: deliveryCount },
        { name: 'Vehicles', count: vehicleCount },
        { name: 'Orders', count: deliveryInfo.length }
    ];

    const handleCountClick = () => {
        setShowDetails(!showDetails);
    };

    const handleRecordClick = (record) => {
        setSelectedRecord(record);
        copyToClipboard(record.address);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/DeleteDeliveryinfofromorder/DeleteDeliveryinfofromorder/${id}`)
            .then(res => {
                // Refresh delivery info after deletion
                axios.get("http://localhost:8000/Deliveryinfofromorder/Deliveryinfofromorder")
                    .then(res => {
                        setDeliveryInfo(res.data);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Address copied to clipboard'))
            .catch((err) => console.error('Error copying text: ', err));
    };

    return (
        <main className="main-container">
            <h3 style={{ color: 'black', textAlign: 'center', fontSize: '43px', fontWeight: 'normal' }}>Delivery Dashboard</h3>
            <br />
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#333', marginBottom: '10px' }}>New Orders</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <div>
                        <p style={{ color: '#333', fontSize: '18px', marginBottom: '5px' }}>Order Count: <span style={{ backgroundColor: '#ffc107', color: '#333', padding: '5px 10px', borderRadius: '20px' }}>{deliveryInfo.length}</span></p>
                    </div>
                    <div onClick={handleCountClick} style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ color: '#333', fontSize: '18px', marginRight: '10px' }}>View Details</p>
                        <BsFillCaretDownFill className="cart_icon" style={{ fontSize: '24px', color: '#333' }} />
                    </div>
                </div>
                {showDetails && (
                    <div style={{ marginTop: '10px' }}>
                        {deliveryInfo.map(delivery => (
                            <div key={delivery._id} onClick={() => handleRecordClick(delivery)} style={{ backgroundColor: selectedRecord === delivery ? '#3390FF' : '#fff', padding: '10px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
                                <p style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Order-ID: {delivery._id}</p>
                                <p style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Name: {delivery.firstName} {delivery.lastName}</p>
                                <p style={{ color: '#333', fontSize: '16px', marginBottom: '5px' }}>Address: {delivery.address}</p>
                                <div style={{paddingLeft: "600px"}}>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(delivery._id)}>Mark As Read</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="main-cards" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div className="card" style={{ width: '400px', height: '150px', marginLeft: "30px", paddingRight: "100px" }}>
                    <div className="card-inner">
                        <h2>Deliveries</h2>
                        <BsFillArchiveFill className="cart_icon" style={{ fontSize: '40px', alignItems: "inherit" }} />
                    </div>
                    <h1>{deliveryCount}</h1>
                </div>
                <div className="card" style={{ width: '400px', height: '150px', marginRight: "30px" }}>
                    <div className="card-inner">
                        <h2>Vehicles</h2>
                        <BsFillGrid3X2GapFill className="cart_icon" style={{ fontSize: '40px' }} />
                    </div>
                    <h1>{vehicleCount}</h1>
                </div>
            </div>
            <div className="charts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    )
}

export default PopupHome;
