import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import ReserveItemModal from "../Form-ReserveItem/ReserveItemModal";

function UserItemCard({ item }) {
  document.title = "Rental Items";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: 2 }}>
        <CardMedia
          component="img"
          height="230"
          image={item.imageUrl}
          alt={item.itemName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              color: item.quantity > 0 ? "green" : "red",
            }}
          >
            Available Quantity: {item.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            One Day Price: {item.oneDayPrice}
          </Typography>
        </CardContent>
        <CardContent sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: item.quantity > 0 ? "green" : "red",
              borderRadius: "0px",
              color: "white",
            }}
            disabled
          >
            {item.quantity > 0 ? "Available to Rent" : "Not Available"}
          </Button>

          <Button
            variant="contained"
            style={{
              backgroundColor: item.quantity > 0 ? "#1a759f" : "#adb5bd",
              marginTop: "02px",
              borderRadius: "5px",
              color: "white",
            }}
            disabled={item.quantity === 0}
            onClick={handleModalOpen}
          >
            Reserve
          </Button>
        </CardContent>
      </Card>

      <ReserveItemModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        item={item}
      />
    </>
  );
}

export default UserItemCard;
