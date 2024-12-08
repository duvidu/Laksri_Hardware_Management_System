import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import formatNumber from "format-number";

const HomeProductDetails = ({ Inventory }) => {
  // Define options for formatting
  const options = { round: 2, padRight: 2, padLeft: 0, thousand: ",", decimal: "." };

  // Format price and discount
  const formattedPrice = formatNumber(options)(parseFloat(Inventory.price));
  const formattedpricebeforeDiscount = formatNumber(options)(parseFloat(Inventory.pricebeforeDiscount));
  const discountPercentage = Inventory.discount;

  return (
    <Card sx={{ maxWidth: 250, height:380,margin: 2, position: 'relative' }}>
      <Link
        to={`http://localhost:5173/cusOrderSelectedItem/${Inventory._id}`}
        style={{ textDecoration: "none" }} 
      >
        <CardMedia
          component="img"
          height="230"
          image={`http://localhost:8000/images/${Inventory.img_URL}`}
          alt="Product"
        />
        {discountPercentage > 0 && (
          <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '5px', fontSize: '14px' }}>
            {discountPercentage}% OFF
          </div>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <strong style={{ textDecoration: "none",color:"#191970",fontSize:"18px" }}>{Inventory.name}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedPrice === formattedpricebeforeDiscount ? (
              <p style={{ fontSize: "16px", textAlign: "center", color: "#191970" }}>Rs {formattedPrice}</p>
            ) : (
              <div style={{ display: "flex", justifyContent: "center",fontSize: "14px" }}>
                <p style={{ textDecoration: "line-through", marginRight: "5px", color: "#ffcc00" }}>Rs {formattedpricebeforeDiscount}</p>
                <p style={{ marginLeft: "5px", color: "#191970" }}>Rs {formattedPrice}</p>
              </div>
            )}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default HomeProductDetails;
