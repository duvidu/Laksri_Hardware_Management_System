import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCard/ItemCard";
import axios from "axios";

function ProductList({ onLendClick, onUpdateItemClick, searchTerm }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // get items
    axios
      .get(`http://localhost:8000/items`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  useEffect(() => {
    // Filter items based on search
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filteredItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onLendClick={onLendClick}
          onUpdateItemClick={onUpdateItemClick}
          style={{ margin: "10px" }}
        />
      ))}
    </div>
  );
}

export default ProductList;
