import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import  './order.css';

const RatingPage = ({ productId}) => {
    const [averageRating, setAverageRating] = useState(null);
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch(`http://localhost:8000/ratings/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ratings');
                }
                const data = await response.json();
                const ratings = data.ratings.map(rating => rating.rating);
                const avgRating = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
                setAverageRating(avgRating);
                setNumberOfRatings(ratings.length);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching ratings:", error);
                setLoading(false);
            }
        };

        fetchRatings();
    }, [productId]);

    
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="average-rating" value={averageRating} readOnly />
            <div className="unitPrice" style={{ marginLeft: '10px', }}>
                <p>Number of Ratings: {numberOfRatings}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Average Rating: {averageRating.toFixed(1)}</p>
               
            </div>
        </div>
            )}
        </div>
    );
};

export default RatingPage;
