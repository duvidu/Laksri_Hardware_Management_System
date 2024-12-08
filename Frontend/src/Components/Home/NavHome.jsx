import homeCss from "./home.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../ReduxTool/userSlice";

import HomeComponent from "./Home-Products";
import Footer from "./footer";
import Header from "./Header";

import { BsPersonCircle } from "react-icons/bs";

function NavHome() {
  const user = useSelector((state) => state.user.user);
  console.log(user.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);

  //logout with route
  //clear cookie data and locatstorage data
  //clear store data from redux tool kit
  const handleLogout = () => {
    axios.get("http://localhost:3001/logout").then((res) => {
      if (res.data.Status) {
        navigate("/login");
      }
    });
    dispatch(clearUser());
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <div className={homeCss.body}>
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
        Discover Top Brands at Laksiri Hardware!
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
        Your Source for Quality Tools and Supplies
      </div>

      <div>
        <HomeComponent />
      </div>
      <Footer />
    </div>
  );
}

export default NavHome;
