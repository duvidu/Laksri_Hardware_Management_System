import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function LendedItemCard({ item, onExtendTime, onItemReceived }) {
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleItemReceived = () => {
    setOpenConfirmation(true);
  };

  const handleConfirmReceived = async () => {
    try {
      // set item received
      await axios.put(
        `http://localhost:8000/items/${item.itemName}/markReceived`
      );
      setOpenConfirmation(false);
      onItemReceived(item);
    } catch (error) {
      console.error("Error marking item as received:", error);
    }
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <Card
      style={{
        margin: "auto",
        backgroundColor: "#f0f0f0",
        marginBottom: "10px",
        width: "70%",
      }}
    >
      {/* Left Side - Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        style={{ width: "100px", height: "100%" }}
      />

      {/* Middle - Details */}
      <CardContent>
        <Typography variant="h6">Item Name: {item.itemName}</Typography>
        <Typography variant="body2">Item ID: {item._id}</Typography>
        <Typography variant="body2">Buyer Name: {item.lenderName}</Typography>
        <Typography variant="body2">NIC No: {item.nicNo}</Typography>
        <Typography variant="body2">
          Days for Rent: {item.daysForLend}
        </Typography>
        <Typography variant="body2">
          Existing lend to Pay (Rs): {item.totalPay}
        </Typography>
      </CardContent>

      {/* Right side - Buttons */}
      <CardActions>
        <Button variant="outlined" onClick={() => onExtendTime(item)}>
          Extend Time Period
        </Button>
        <Button variant="outlined" onClick={handleItemReceived}>
          Item Received
        </Button>
      </CardActions>

      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure this item received and Payment handeled?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmReceived} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseConfirmation} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default LendedItemCard;
