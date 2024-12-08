import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react';
const CartCount = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        fetch('http://localhost:8000/cart')
            .then((response) => response.json())
            .then((data) => {
                
                setCarts(data.carts); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching cart details:", error);
                setLoading(false);
            });
    }, []);

    const getTotalItemsCount = () => {
        let totalCount = 0;
        carts.forEach(cart => {
            cart.cartItems.forEach(item => {
                totalCount += item.quantity;
            });
        });
        return totalCount;
    };

  return (
    <div className="cart-icon">
                <ShoppingCartIcon />
                <span>{getTotalItemsCount()}</span>
    </div>
  );
};

export default CartCount;



