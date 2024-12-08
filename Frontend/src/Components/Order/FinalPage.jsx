import React from 'react';
import './order.css';



const FinalPage = () => {
  
  return (
    <div>
       
    <div className="thank">
        <div ><img className="check"src={`http://localhost:8000/logos/check.png`} alt="Check" /></div>
        <p className="success">Order Successful</p>
        <p>Thank you</p>
        <p>for your order</p>
        
    </div>
    </div>
  );
};

export default FinalPage;