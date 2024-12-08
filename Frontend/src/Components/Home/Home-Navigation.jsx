import homeCss from "./home.module.css";
import CartCount from '../Order/CartCount';

const navigationBar = () => {
    return ( 
      <div className={homeCss.navbar}>
        <div className={homeCss.navbarContent}>
          <div className={homeCss.logo}><img className= {homeCss.navbarLogo} src={`http://localhost:8000/logos/laksiri-hardware-logo1.jpg`} alt="Product" /></div>
          <ul className={homeCss.navLinks}>
            <li>
              <a href="/cart"> <CartCount/></a>
            </li>
            <li>
              <a href="/userItemList">Rental Items</a>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      </div>
     );
}
 
export default navigationBar;