import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const footer = () => {
  return (
    <MDBFooter
      style={{ backgroundColor: "#74c0fc" }}
      className="text-center text-lg-start text-muted"
    >
      <section className="">
        <MDBContainer
          className="text-center text-md-start mt-5 pt-2"
          style={{ color: "white" }}
        >
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                laksiri hardware
              </h6>

              <img
                style={{ marginLeft: "28px" }}
                src={`http://localhost:8000/logos/laksiri-hardware-logo1.jpg`}
                alt="Product"
                width={"150px"}
              />
              <p style={{ marginTop: "10px", marginLeft: "20px" }}>
                2024 All rights reserved.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 ">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  About Us
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Delivery Information
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Terms & Conditions
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">CONNECT WITH US</h6>
              <p>
                <MDBIcon icon="home" className="me" />
                No:978/1A Malabe Road,Kottawa,Sri Lanka
              </p>
              <p>
                <MDBIcon icon="envelope" className="me" />
                laksirihardware@gamil.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me" /> +94 75 348 4484
              </p>
              <p>
                <MDBIcon icon="print" className="me" /> +94 11 304 4586
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBRow
          className="text-center text-md-start "
          style={{
            backgroundColor: "#191970",
            color: "white",
            maxWidth: "100%",
            margin: "auto",
          }}
        >
          <h6 style={{ margin: "0 auto", textAlign: "center" }}>
            © 2024 Laksiri Hardware All rights reserved.
          </h6>
        </MDBRow>
      </section>
    </MDBFooter>
  );
};
export default footer;
