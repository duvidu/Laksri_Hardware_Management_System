// HomeProductDetails.js
import React from "react";
import { Link } from "react-router-dom";

const HomeProductDetails = ({ Inventory}) => {
    
     return ( 
        <div>
             <Link to={`/cusSelectedItem/${Inventory._id}`} className="singleProduct">
                 <div className="homeProductDetails">
                     <div className="product-picture"></div>
                     <div>{Inventory.name}</div>
                     <div>{Inventory.price}</div>
                 </div>
             </Link>
             
         </div>
    
    );

    

    
};
 
export default HomeProductDetails;
