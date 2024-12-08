import { Link } from "react-router-dom";

const ProductDetails = ({Inventory}) => {
    return ( 
        <div className="productDetails">
            <Link to={ `/selectedItem/${Inventory._id}`}>
            <ul>
                <li>{Inventory.name}</li>
                <li>{Inventory.category}</li>
                <li className="price">{Inventory.price}</li>
                <li className="quantity">{Inventory.quantity}</li>
            </ul>
            </Link>
        </div>
        
     );
}
 
export default ProductDetails;