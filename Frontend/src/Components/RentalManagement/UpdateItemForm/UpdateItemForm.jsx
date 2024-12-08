import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const UpdateItemForm = ({ isOpen, onClose, selectedItem }) => {
  const [updatedItemData, setUpdatedItemData] = useState({
    imageUrl: "",
    itemName: "",
    description: "",
    quantity: "",
    oneDayPrice: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setUpdatedItemData({
        imageUrl: selectedItem.imageUrl || "",
        itemName: selectedItem.itemName || "",
        description: selectedItem.description || "",
        quantity: selectedItem.quantity || "",
        oneDayPrice: selectedItem.oneDayPrice || "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItemData({ ...updatedItemData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Item Data:", updatedItemData);
    try {
      // update item data
      await axios.put(
        `http://localhost:8000/items/${selectedItem._id}`,
        updatedItemData
      );
      console.log("Item updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          minWidth: "300px",
        }}
      >
        <h2
          style={{
            textDecoration: "underline",
            fontSize: "25px",
            marginBottom: "15px",
          }}
        >
          Update Item
        </h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                label="Image URL"
                value={updatedItemData.imageUrl}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="itemName"
                label="Item Name"
                value={updatedItemData.itemName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={updatedItemData.description}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="quantity"
                label="Available Quantity"
                type="number"
                value={updatedItemData.quantity}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="oneDayPrice"
                label="One Day Price"
                type="number"
                value={updatedItemData.oneDayPrice}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginBottom: "8px",
                backgroundColor: "#1a759f",
                fontWeight: "bold",
              }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              style={{
                backgroundColor: "#ffffff",
                color: "#ef476f",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateItemForm;
