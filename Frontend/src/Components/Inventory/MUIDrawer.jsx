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
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddProductForm from './InventoryForm';
import AddNewCategoryForm from './inventory-AddNewCategory';
import AddNewBrandForm from './inventory-AddNewBrand';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useState } from "react";
import AddReturnItemForm from './returnItemForm';


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
  const [addBrandDialogOpen, setAddBrandDialogOpen] = useState(false);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [addReturnItemDialogOpen, setAddReturnItemDialogOpen] = useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddCategoryDialogOpen = () => {
    setAddCategoryDialogOpen(true);
  };

  const handleAddCategoryDialogClose = () => {
    setAddCategoryDialogOpen(false);
  };

  const handleAddBrandDialogOpen = () => {
    setAddBrandDialogOpen(true);
  };

  const handleAddBrandDialogClose = () => {
    setAddBrandDialogOpen(false);
  };

  const handleAddProductDialogOpen = () => {
    setAddProductDialogOpen(true);
  };

  const handleAddProductDialogClose = () => {
    setAddProductDialogOpen(false);
  };

  const handleReturnItemDialogOpen = () => {
    setAddReturnItemDialogOpen(true);
  };

  const handleReturnItemDialogClose = () => {
    setAddReturnItemDialogOpen(false);
    setRefreshPage(true);
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
            <h4>Inventory</h4>
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
          <Link to={`http://localhost:5173/inventory`} style={{textDecoration:"none",color:"black"}}>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
          </Link>
          <ListItemButton onClick={handleAddCategoryDialogOpen}>
            <ListItemText primary="Add New Category" />
          </ListItemButton>
          <ListItemButton onClick={handleAddBrandDialogOpen}>
            <ListItemText primary="Add New Brand" />
          </ListItemButton>
          <ListItemButton onClick={handleAddProductDialogOpen}>
            <ListItemText primary="Add New Products" />
          </ListItemButton>
          <ListItemButton onClick={handleReturnItemDialogOpen}>
            <ListItemText primary="Return Item" />
          </ListItemButton>
          <Link to={`http://localhost:5173/inventory/report1`} style={{textDecoration:"none",color:"black"}}>
          <ListItemButton >
            <ListItemText primary="Inventory Report" />
          </ListItemButton>
          </Link>
          <Link to={`http://localhost:5173/`} style={{textDecoration:"none",color:"red"}}>
          <ListItemButton >
            <ListItemText primary="Customer Side Home" />
          </ListItemButton>
          </Link>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* Add New Category Dialog */}
        <Dialog open={addCategoryDialogOpen} onClose={handleAddCategoryDialogClose} maxWidth="100px">
          <DialogContent>
            <AddNewCategoryForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCategoryDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Add New Brand Dialog */}
        <Dialog open={addBrandDialogOpen} onClose={handleAddBrandDialogClose} maxWidth="100px">
          <DialogContent>
            <AddNewBrandForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddBrandDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Add New Product Dialog */}
        <Dialog open={addProductDialogOpen} onClose={handleAddProductDialogClose} maxWidth="1000px" >
          <DialogTitle>
            <h2>Add New Product</h2>
          </DialogTitle>
          <DialogContent>
            <AddProductForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddProductDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* Return Item Dialog */}
        <Dialog open={addReturnItemDialogOpen} onClose={handleReturnItemDialogClose} maxWidth="1000px" >
          <DialogTitle>
            <h2>Return Item</h2>
          </DialogTitle>
          <DialogContent>
            <AddReturnItemForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReturnItemDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </Main>
    </Box>
  );
}
