import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

function ItemCard({ item, onLendClick, onUpdateItemClick }) {
  const handleLendClick = () => {
    console.log(`Lend item clicked for: ${item.itemName}`);
    if (item.quantity < 1) {
      setNoItemsDialogOpen(true);
    } else {
      // Open the lend form
      onLendClick(item._id, item.itemName, item.oneDayPrice);
    }
  };

  const handleUpdateClick = () => {
    console.log(`Update item clicked for: ${item.itemName}`);
    onUpdateItemClick(item);
  };
  const [isNoItemsDialogOpen, setNoItemsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseNoItemsDialog = () => {
    setNoItemsDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/items/${item._id}`);
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    handleCloseDeleteDialog();
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <CardMedia
        component="img"
        height="220px"
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
        <Typography variant="body2" color="text.secondary">
          Available Quantity: {item.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          One Day Price: {item.oneDayPrice}
        </Typography>
      </CardContent>
      <CardContent sx={{ textAlign: "right", backgroundColor: "#f8f9fa" }}>
        <Button
          variant="contained"
          className="availButton"
          sx={{ marginLeft: "0", margin: "4px", backgroundColor: "#1a759f" }}
          onClick={handleUpdateClick}
        >
          Update Item
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "0", margin: "4px", backgroundColor: "#1a759f" }}
          onClick={handleLendClick}
        >
          Rent
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "0", margin: "4px", backgroundColor: "#1a759f" }}
          onClick={handleDeleteClick}
        >
          Remove Item
        </Button>
      </CardContent>

      <Dialog
        open={isNoItemsDialogOpen}
        onClose={handleCloseNoItemsDialog}
        aria-labelledby="no-items-dialog-title"
        aria-describedby="no-items-dialog-description"
      >
        <DialogTitle id="no-items-dialog-title">No Items Available</DialogTitle>
        <DialogContent>
          <DialogContentText id="no-items-dialog-description">
            There are no items available to rent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoItemsDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure you want to delete this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ItemCard;
