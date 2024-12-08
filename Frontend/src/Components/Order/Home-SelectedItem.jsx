import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './order.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import RatingComponent from './RatingPage';
import RatingPage from "./RatingComponent";
import Stack from '@mui/material/Stack';
import NavigationBar from '../Home/Home-Navigation';
import Footer from '../Home/footer'

import formatNumber from 'format-number';


const HomeSelectedItem = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const user = useSelector((state) => state.user.user);
  console.log(user.name);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  


  
  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;

    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });

    
  }, [id]);

  const handleRatingChange = async (newRating) => {
    try {
      const response = await fetch('http://localhost:8000/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
          userId: '662639b6d941c0f2cc66be48', 
          rating: newRating,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add rating');
      }
      console.log('Rating added successfully');
      setRating(newRating); 


      
    } catch (error) {
      console.error('Error adding rating:', error);
      
    }
  };
  


  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: [{
            product: product._id,
            quantity: 1,
            price: product.price,
          }],
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      

    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Define options for formatting
  const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

  return (
  <div>
    <NavigationBar/>

    <div className="selectedOrderProduct">
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (
        <div className="OrderdetailsBox">
          <div className="productImageContainer">
            <div className="productImageContainer" style={{ borderRadius: '12px', border: '1px solid #0056b3' }}>
              <img
                className="productImage"
                src={`http://localhost:8000/images/${product.img_URL}`}
                alt={product.name}
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
          <div className="productOrderDetails">
            <p className="productName">Product Name : {product.name}</p>
            <p className="unitPrice">Unit Price : Rs {product.price && formatNumber(options)(parseFloat(product.price))}</p>
            <p className="availableAmount">Available Amount : {product.quantity}</p>
            <p className="availableAmount">Brand : {product.brand}</p>
            <p className="availableAmount">Description : {product.description}</p>
            <Stack spacing={2} direction="column">
              {product.quantity > 0 ? (
                <Button variant="contained" size="medium" style={{ width: '200px' }} onClick={handleAddToCart} startIcon={<AddShoppingCartIcon />}>
                  Add to Cart
                </Button>
              ):(
                <p className="outOfStockMsg">Out of Stock</p>
              )}
              <Button variant="contained" size="medium" style={{ width: '200px' }} component={Link} to="/cart" startIcon={<ShoppingCartIcon />}>
                View Cart
              </Button>
            </Stack>

            <p className="unitPrice">Rate this item</p>

            <RatingComponent value={rating} onChange={handleRatingChange} />
            <RatingPage productId={id}  />
          </div>
        </div>
      )}
    </div>
      <Footer/>
    </div>
  );
};

export default HomeSelectedItem;
