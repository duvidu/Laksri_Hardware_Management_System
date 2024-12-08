import React, { useState } from "react";
import { Modal, TextField, Button, Grid, DialogContent } from "@mui/material";
import axios from "axios";

const UpdateForm = ({ isOpen, onClose, item, onSave }) => {
  const [numberOfDays, setNumberOfDays] = useState(0);

  const addingValue = numberOfDays * item.oneDayPrice;
  const totalPay = item.totalPay + addingValue;

  const updatedDaysForLend = item.daysForLend + parseInt(numberOfDays, 10);

  const handleUpdate = () => {
    // update the totalPay value
    axios
      .put(
        `http://localhost:8000/lendedItems/${item._id}/updateTotalPayAndDaysForLend`,
        {
          totalPay,
          daysForLend: updatedDaysForLend,
        }
      )
      .then((response) => {
        console.log("TotalPay updated successfully:", response.data);
        onClose();
        onSave(response.data);
      })
      .catch((error) => {
        console.error("Error updating totalPay:", error);
      });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="update-form-modal"
      aria-describedby="update-form-modal-description"
      style={{
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "500px",
          }}
        >
          <h2
            style={{
              textDecoration: "underline",
              fontSize: "25px",
              marginBottom: "10px",
            }}
          >
            Update Form
          </h2>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Item Name"
                  value={item.itemName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Item ID"
                  value={item._id}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Lender Name"
                  value={item.lenderName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price for One Day"
                  value={item.oneDayPrice}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Existing Lend to Pay"
                  value={item.totalPay}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="No. of Days to Extend"
                  type="number"
                  value={numberOfDays}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Adding Value"
                  value={addingValue}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Total Pay"
                  value={totalPay}
                  fullWidth
                  style={{ color: "red" }}
                  disabled
                  InputProps={{
                    style: {
                      fontSize: "1.2em",
                      color: "red",
                      fontWeight: "bold",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <div style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={handleUpdate}
                style={{
                  marginBottom: "5px",
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
                  marginBottom: "5px",
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
      </DialogContent>
    </Modal>
  );
};

export default UpdateForm;
