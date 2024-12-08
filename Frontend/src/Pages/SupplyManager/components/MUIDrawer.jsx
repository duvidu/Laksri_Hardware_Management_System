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
import SearchBar from "./searchBar/searchBar";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { Tooltip } from "@mui/material";

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MuiDrawer() {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const components = [
    // {
    //   text: "Overview",
    //   path: "/supply-management",
    // },
    {
      text: "Purchase Orders",
      path: '/supply-management/purchase-orders'
    },

    {
      text: "Supplier Management",
      path: "/supply-management/supplier-management"
    },
    {
      text: "Return Management",
      path: "/supply-management/return-management"
    },
    // {
    //   text: "Report and Analytics",
    //   path: "/supply-management/reports",
    // },
  ];

  const getCurrentRouteText = () => {
    if (location.pathname === "/supply-management/low-stock-notifications") {
      return "Low Stock Items";
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
            {getCurrentRouteText()}
          </Typography>


          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Low Stock Items">
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
                marginRight: 1
              }}
            >
              <Badge color="error" batchcontent={17}>
                <ProductionQuantityLimitsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Return Items">
            <IconButton
              component={Link}
              to="/supply-management/return-items-notifications"
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
                <AssignmentReturnIcon />
              </Badge>
            </IconButton>
          </Tooltip>
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
          {components.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph></Typography>
        <Typography paragraph></Typography>
      </Main>
    </Box>
  );
}
