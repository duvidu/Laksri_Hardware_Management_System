import homeCss from "./home.module.css";

const kFooter = () => {
  return (
    <div className={homeCss.footerMain}>
      <div className={homeCss.footerSection1}>
        <div className={homeCss.footerColumn1}>
          <img
            className={homeCss.footerLogo}
            src={`http://localhost:8000/logos/laksiri-hardware-logo1.jpg`}
            alt="Product"
          />
        </div>
        <div className={homeCss.footerColumn2}>
          <h6>INFORMATION</h6>
          <ul>
            <li>Home</li>
            <li>About US</li>
            <li>Delivery Information</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className={homeCss.footerColumn3}>
          <h6>MY ACCOUNT</h6>
          <ul>
            <li>User</li>
            <li>Cart</li>
            <li>Contact Us</li>
            <li>Rewards</li>
          </ul>
        </div>
        <div className={homeCss.footerColumn4}>
          <h6>CONNECT WITH US</h6>
          <div>+94 75 348 4484</div>
          <div>laksirihardware@gamil.com</div>
          <div>
            No:978/1A Malabe Road,
            <br />
            Kottawa,Sri Lanka
          </div>
        </div>
      </div>
      <div className={homeCss.footerSection2}>
        <h6>© 2024 Laksiri Hardware All rights reserved.</h6>
      </div>
    </div>
  );
};

export default kFooter;
