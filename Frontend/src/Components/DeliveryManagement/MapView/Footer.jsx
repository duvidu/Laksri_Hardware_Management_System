import React from "react";
import { AppBar, Toolbar, Typography, IconButton, styled } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 20px",
//   backgroundColor: "#F9F7F7",
});

const SocialIcons = styled("div")({
  display: "flex",
  gap: "10px",
});

const Footer = () => {
  return (
    <AppBar position="sticky" color="transparent">
      <StyledToolbar>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Laksiri Hardware
        </Typography>
        <SocialIcons>
          <IconButton aria-label="Facebook" color="inherit">
            <Facebook />
          </IconButton>
          <IconButton aria-label="Twitter" color="inherit">
            <Twitter />
          </IconButton>
          <IconButton aria-label="Instagram" color="inherit">
            <Instagram />
          </IconButton>
          <IconButton aria-label="LinkedIn" color="inherit">
            <LinkedIn />
          </IconButton>
        </SocialIcons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Footer;
