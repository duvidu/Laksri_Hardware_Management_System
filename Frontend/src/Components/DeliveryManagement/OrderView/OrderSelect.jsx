import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import UpdateCss from './UpdateUsers.module.css';

function UpdateUsers() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [imageURL, setImageURL] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUserforAnotherRetreive/${id}`)
            .then(result => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setImageURL(result.data.image);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Container className={UpdateCss.container}>
            <Card className={UpdateCss.card}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>User Details</Typography>
                    <div className="mb-2">
                        <TextField
                            label="Name"
                            value={name}
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            label="Email"
                            value={email}
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            label="Age"
                            value={age}
                            fullWidth
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        {imageURL && (
                            <CardMedia
                                component="img"
                                src={imageURL}
                                alt="User"
                                className={UpdateCss.image}
                            />
                        )}
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

export default UpdateUsers;
