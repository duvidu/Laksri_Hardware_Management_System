import React, { useState } from "react";
import "./searchBar.css";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch , placeholder}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
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
          height:45
        }}
      >
        <div className="search-container" >
          <Paper
            component="form"
            sx={{
              p: "2px 20px",
              display: "flex",
              alignItems: "center",
              
            }}
          >
            <span>
              <InputBase
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 , width:220}}
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
