import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Modal } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ReservedItemsList = () => {
  document.title = "Reserved Items";
  const [reservedItems, setReservedItems] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showRemoveConfirmationModal, setShowRemoveConfirmationModal] =
    useState(false);

  useEffect(() => {
    const fetchReservedItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/reservedItems");
        setReservedItems(response.data);
      } catch (error) {
        console.error("Error fetching reserved items:", error);
      }
    };

    fetchReservedItems();
  }, []);

  const handleRent = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmationModal(true);
  };

  const handleConfirmRent = async () => {
    try {
      const selectedItem = reservedItems.find(
        (item) => item._id === selectedItemId
      );

      if (!selectedItem) {
        console.error("Selected item not found");
        return;
      }

      const newRentedItem = {
        itemId: selectedItem.itemId,
        itemName: selectedItem.itemName,
        lenderName: selectedItem.buyerName,
        daysForLend: selectedItem.daysToRent,
        oneDayPrice: selectedItem.oneDayPrice,
        totalPay: selectedItem.totalPay,
      };

      await axios.post("http://localhost:8000/lendedItems", newRentedItem);
      await axios.delete(
        `http://localhost:8000/reservedItems/${selectedItemId}`
      );

      setReservedItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedItemId)
      );

      setShowConfirmationModal(false);

      console.log("Rented item added:", newRentedItem);
      console.log("Selected item removed from reserved items:", selectedItemId);
    } catch (error) {
      console.error("Error confirming rent:", error);
    }
  };

  const handleCancelRent = () => {
    setShowConfirmationModal(false);
  };

  const handleRemove = (itemId) => {
    setSelectedItemId(itemId);
    setShowRemoveConfirmationModal(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/reservedItems/${selectedItemId}`
      );
      setReservedItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedItemId)
      );
      setShowRemoveConfirmationModal(false);
    } catch (error) {
      console.error("Error removing reserved item:", error);
    }
  };

  const handleCancelRemove = () => {
    setShowRemoveConfirmationModal(false);
  };

  return (
    <>
      <h2
        style={{
          textDecoration: "underline",
          fontSize: "30px",
          marginTop: "10px",
          marginBottom: "15px",
          textAlign: "center",
          color: "#415a77",
        }}
      >
        Reserved Items List
      </h2>
      {reservedItems.map((item) => (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            margin: "auto",
            width: "70%",
          }}
        >
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              marginBottom: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Item Name: {item.itemName}
              </Typography>
              <Typography variant="body1">Item ID: {item.itemId}</Typography>
              <Typography variant="body1">
                Buyer Name: {item.buyerName}
              </Typography>
              <Typography variant="body1">
                Contact No: {item.contactNo}
              </Typography>
              <Typography variant="body1">NIC No: {item.nicNo}</Typography>
              <Typography variant="body1">
                Days to Rent: {item.daysToRent}
              </Typography>
              <Typography variant="body1">
                One Day Price: {item.oneDayPrice}
              </Typography>
              <Typography variant="body1">
                Total Price: {item.totalPay}
              </Typography>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleRemove(item._id)}
                  style={{
                    backgroundColor: "",
                    color: "#ef476f",
                    fontWeight: "bold",
                    marginRight: "8px",
                  }}
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRent(item._id)}
                  style={{
                    backgroundColor: "#1a759f",
                    fontWeight: "bold",
                  }}
                >
                  Rent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      <Modal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        aria-labelledby="rent-confirmation-modal"
        aria-describedby="rent-confirmation-description"
      >
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
              fontSize: "25px",
              marginBottom: "10px",
            }}
          >
            Rent Confirmation
          </h2>
          <p id="rent-confirmation-description">
            Are you sure you want to rent this reservation?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRent}
            style={{
              marginBottom: "5px",
              backgroundColor: "#1a759f",
              fontWeight: "bold",
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelRent}
            style={{
              marginBottom: "5px",
              backgroundColor: "#ffffff",
              color: "#ef476f",
              fontWeight: "bold",
            }}
          >
            No
          </Button>
        </div>
      </Modal>

      <Modal
        open={showRemoveConfirmationModal}
        onClose={() => setShowRemoveConfirmationModal(false)}
        aria-labelledby="remove-confirmation-modal"
        aria-describedby="remove-confirmation-description"
      >
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
              fontSize: "25px",
              marginBottom: "10px",
            }}
          >
            Remove Confirmation
          </h2>
          <p id="remove-confirmation-description">
            Are you sure you want to remove this reservation?
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRemove}
            style={{
              marginBottom: "5px",
              backgroundColor: "#1a759f",
              fontWeight: "bold",
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelRemove}
            style={{
              marginBottom: "5px",
              backgroundColor: "#ffffff",
              color: "#ef476f",
              fontWeight: "bold",
            }}
          >
            No
          </Button>
        </div>
      </Modal>

      <Link to="/rentalService">
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: "5px",
            backgroundColor: "#354f52",
            fontWeight: "bold",
            borderRadius: "0px",
          }}
          endIcon={<SendIcon />}
        >
          Go to Item List
        </Button>
      </Link>
    </>
  );
};

export default ReservedItemsList;
