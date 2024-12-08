import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Modal from "react-modal";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useState } from "react";
import AddNewItemForm from "./Form-addItem/AddNewItemForm";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MuiDrawer() {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [addReturnItemDialogOpen, setAddReturnItemDialogOpen] = useState(false);
  const [isAddNewItemFormOpen, setAddNewItemFormOpen] = useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddItemClick = () => {
    setAddNewItemFormOpen(true);
  };

  const handleCloseAddNewItemForm = () => {
    setAddNewItemFormOpen(false);
  };



  const getCurrentRouteText = () => {
    if (location.pathname === "inventory/report1") {
      return "Inventory Report";
    }
    const currentComponent = components.find(
      (item) => item.path === location.pathname
    );
    return currentComponent ? currentComponent.text : "";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              width: 50,
              height: 50,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <h4>Rental Service</h4>
          </Typography>


          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            component={Link}
            to="/supply-management/low-stock-notifications"
            size="large"
            aria-label="show new notifications"
            color="inherit"
            edge="end"
            sx={{
              width: 50,
              height: 50,
            }}
          >
            <Badge color="error" batchcontent={17}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <p>Notifications</p> */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ width: 50, height: 50 }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton href="/rentalservice">
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={handleAddItemClick}>
            <ListItemText primary="Add New Item" />
          </ListItemButton>
          <ListItemButton href="/rentalservice/lendedItems">
            <ListItemText primary="View Rented Items" />
          </ListItemButton>
          <ListItemButton href="/rentalservice/reserved-items">
            <ListItemText primary="View Reserved Items" />
          </ListItemButton>
          <ListItemButton href="/rentalservice/rentalReport">
            <ListItemText primary="Invoice" />
          </ListItemButton>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Modal
            isOpen={isAddNewItemFormOpen}
            onRequestClose={handleCloseAddNewItemForm}
            contentLabel="Add New Item Form Modal"
          >
            <AddNewItemForm onClose={handleCloseAddNewItemForm} />
          </Modal>
      </Main>
    </Box>
  );
}
