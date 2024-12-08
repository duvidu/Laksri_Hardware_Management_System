import React, { useState } from "react";
import "./searchBar.css";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <div
        className="searchBar"
        style={{
          border: "0.1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <div className="search-container">
          <Paper
            component="form"
            sx={{
              p: "2px 40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>
              <InputBase
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 }}
              />
            </span>
            <span>
              <IconButton type="button" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </span>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
