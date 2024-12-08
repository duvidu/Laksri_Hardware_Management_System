import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LogoutIcon from '@mui/icons-material/Logout';
import { FaBars } from "react-icons/fa";
import CartCount from "../Order/CartCount";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUser } from "../ReduxTool/userSlice";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const StyledHeader = styled.header`
  background-color: #1d1d33d7;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }

  .profile-info {
    display: flex;
    align-items: center;
  }

  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleCategoriesClick = (event) => {
    event.preventDefault();
    setDrawerOpen(true);
  };

  const handleLogout = () => {
    axios.get("http://localhost:8000/logout").then((res) => {
      if (res.data.Status) {
        dispatch(clearUser());
        navigate("/login");
      }
    });
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(false);
    setCurPage(1);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <StyledHeader>
        <div className="nav_logo">
          <Link to={"/"} className="nav-logo-link">
            <img
              src={`./logo_laksiri.png`}
              alt="Product"
              width={"100px"}
              height={"50px"}
            />
          </Link>
        </div>

        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
        
        <NavMenu isToggleOpen={isToggleOpen} >
          <li style={{width:"120px"}}>
            <Link to={"/"} className="nav-menu-list">
              Home
            </Link>
          </li>

          <li style={{width:"120px"}}>
            <Link
              to={"/projects"}
              className="nav-menu-list"
              onClick={handleCategoriesClick}
            >
              Categories
            </Link>
          </li>

          <li style={{width:"120px"}}>
            <Link to={"/userItemList"} className="nav-menu-list">
              Rental Items
            </Link>
          </li>

          <li style={{width:"120px"}}>
            <Link to={"/Cart"} className="nav-menu-list">
              <div className="profile-info">
                <CartCount />
              </div>
            </Link>
          </li>
          
          <li>
            <Link to={"/"} className="nav-menu-list">
              <BsPersonCircle className="iconHeader" />
              Hello {user.name}
            </Link>
          </li>

          <li style={{width:"50px"}}>
            <Link
              to={"/login"}
              className="nav-menu-list"
              onClick={handleLogout}
            >
              <LogoutIcon/>
            </Link>
          </li>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List>
              <ListItem key="All" onClick={() => handleCategory("")}>
                <ListItemText primary="All" />
              </ListItem>
              {categories.map((category) => (
                <ListItem
                  key={category._id}
                  onClick={() => handleCategory(category.name)}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </NavMenu>
      </StyledHeader>
    </>
  );
};

export default Header;
