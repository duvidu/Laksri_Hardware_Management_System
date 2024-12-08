import React from "react";

const headerStyle = {
  backgroundColor: "#001C30",
  color: "white",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "0.5rem 0"
};

const bodyContentStyle = {
  paddingTop: "65px" // Adjust this value based on the actual height of your header
};

export default function Header() {
  return (
    <>
      <header style={headerStyle}>
        <nav className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Hardware Management System
            </a>
          </div>
        </nav>
      </header>
      <div style={bodyContentStyle}>
        {/* All other page content should go here */}
      </div>
    </>
  );
}
