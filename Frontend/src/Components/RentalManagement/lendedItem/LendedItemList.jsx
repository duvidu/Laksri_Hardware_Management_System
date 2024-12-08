import React, { useState, useEffect } from "react";
import LendedItemCard from "./LendedItemCard";
import UpdateForm from "../Form-update/UpdateForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const LendedItemList = () => {
  document.title = "Rented Items";
  const [lendedItems, setLendedItems] = useState([]);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchLendedItems();
  }, []);

  // Get lended items
  const fetchLendedItems = () => {
    axios
      .get(`http://localhost:8000/lendedItems`)
      .then((response) => {
        setLendedItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lended items:", error);
      });
  };

  // marking item as received
  function onItemReceived(item) {
    // delete the item
    axios
      .delete(`http://localhost:8000/lendedItems/${item._id}`)
      .then(async (response) => {
        console.log("Item received:", response.data);
        // Remove the item from the list
        const updatedItems = lendedItems.filter((i) => i._id !== item._id);
        setLendedItems(updatedItems);

        // Save the deleted record to rental-report
        const reportData = {
          itemId: item.itemId,
          itemName: item.itemName,
          lenderName: item.lenderName,
          daysForLend: item.daysForLend,
          oneDayPrice: item.oneDayPrice,
          totalPay: item.totalPay,
        };

        try {
          // save the record to rental-report
          await axios.post("http://localhost:8000/rentalReport", reportData);
          console.log("Deleting record saved to rental-report:", reportData);
        } catch (error) {
          console.error(
            "Error saving deleting record to rental-report:",
            error
          );
        }
      })
      .catch((error) => {
        console.error("Error marking item as received:", error);
      });
  }

  // handle extending time
  function onExtendTime(item) {
    setUpdateFormOpen(true);
    setSelectedItem(item);
  }

  // close the Update Form
  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
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
        Rented Items List
      </h2>

      {Array.isArray(lendedItems) &&
        lendedItems.map((item) => (
          <LendedItemCard
            key={item._id}
            item={item}
            onExtendTime={() => onExtendTime(item)}
            onItemReceived={() => onItemReceived(item)}
          />
        ))}

      {/* Update Form */}
      {isUpdateFormOpen && selectedItem && (
        <UpdateForm
          isOpen={isUpdateFormOpen}
          onClose={closeUpdateForm}
          item={selectedItem}
          onSave={(formData) => {
            // After saving the updated data, fetch the updated lended items
            fetchLendedItems();
            closeUpdateForm();
          }}
        />
      )}

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
    </div>
  );
};

export default LendedItemList;
