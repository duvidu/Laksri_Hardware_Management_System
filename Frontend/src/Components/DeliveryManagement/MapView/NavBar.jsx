import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import React from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  height: "24px", // Adjust the height here
});

const NavBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ffffff"  }}>
      <StyledToolbar>
        <Typography variant="h6" align="center" color={"black"}>
          Delivery Management
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
