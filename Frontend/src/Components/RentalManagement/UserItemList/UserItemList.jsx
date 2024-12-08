import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../searchBar/searchBar";
import UserItemCard from "../UserItemCard/UserItemCard";
import NavigationBar from "../../Home/Home-Navigation";
import Footer from "../../Home/footer";
import Header from "../../Home/Header";
import "./UserItemList.css";

function UserItemList() {
  document.title = "Rental Item List";
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

  // handle search
  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="">
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          color: "#fca311",
          fontFamily: "unset",
          fontWeight: "600",
          fontSize: "30px",
          letterSpacing: "5px",
        }}
      >
        Rent Your Perfect Match Today!
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1px",
          marginBottom: "20px",
          color: "#415a77",
          fontFamily: "unset",
          fontWeight: "600",
          fontSize: "20px",
          letterSpacing: "4px",
        }}
      >
        We made renting easy
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <SearchBar onSearch={handleSearch} />{" "}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredItems.map((item) => (
          <UserItemCard key={item._id} item={item} style={{ margin: "10px" }} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default UserItemList;
