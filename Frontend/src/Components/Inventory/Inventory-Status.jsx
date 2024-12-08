import { Link } from "react-router-dom";
import { Home, Category, MonetizationOn } from "@mui/icons-material"; 
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import formatNumber from 'format-number'; 
import './InventoryStyles.css';

const Status = (props) => {
    
    const totalValue = props.totalvalue;
    const totalproducts = props.totalProducts;
    const totalOutOfproducts = props.outOfStock;
    const totalCategories = props.totalCategories;
    
    // Define options for formatting
  const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

    return ( 
        <header>
            <div className="statusBoxs" >
                <div className="box1" >
                    <Home /> 
                    <h4>Total Products:</h4>
                    <h4>{totalproducts}</h4>
                </div>
                <div className="box2" >
                    <Category /> 
                    <h4>All Categories:</h4>
                    <h4>{totalCategories}</h4>
                </div>
                <div className="box3" >
                    <Link to='/supply-management/low-stock-notifications'>
                        <ProductionQuantityLimitsIcon /> 
                        <h4>Out of Stock:</h4>
                        <h4>{totalOutOfproducts}</h4> 
                    </Link>                         
                </div>
                <div className="box4" >
                    <MonetizationOn /> 
                    <h4>Total Value:</h4>
                    <h4>{formatNumber(options)(totalValue)}</h4>
                </div>
            </div>
        </header>
     );
}
 
export default Status;
