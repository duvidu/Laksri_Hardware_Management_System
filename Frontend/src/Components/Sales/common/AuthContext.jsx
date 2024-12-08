import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserRole = Cookies.get('userRole') || null;
  const storedToken = Cookies.get('token') || null;
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(initialUserRole);
  const [userToken, setUserToken] = useState(storedToken);
  const [cart, setCart] = useState([]);

  // Check if the user role is stored in cookies when the component mounts
  useEffect(() => {
    try {
      const storedUserRole = Cookies.get('userRole');
      const token = Cookies.get('token');
      if (storedUserRole && token) {
        setUserRole(storedUserRole);
        setUserToken(token);
      } else {
        toast.error('Please Login');
      }
    } catch (error) {
      console.error('Error retrieving user data from cookies:', error);
      toast.error('An error occurred. Please try again.');
    }

  }, []);

  const login = (role, token) => {
    setUserRole(role);
    setUserToken(token)
    // Save the user role in cookies
    Cookies.set('userRole', role, { expires: 1, path: '/' });
    Cookies.set('token', token, { expires: 1, path: '/' });
  };

  const logout = () => {
    setUserRole(null);
    setUserToken(null);
    // Remove the user role from cookies
    Cookies.remove('userRole', { path: '/' });
    Cookies.remove('token', { path: '/' });
    toast.warning('Logout Success!')
    window.location.reload();
  };

  const addItemToCart = (item) => {

    setCart((prev) => [...prev, { ...item, qty: 1 }]);
    toast.success('Item added')
    console.log(cart);
  }
  
  const removeItemFromCart = (item) => {
    setCart((prev) => prev.filter((it) => (it !== item)));
  }

  //add item qty
  const addQty = (id) => {
    const index = cart.findIndex((it) => it._id === id);
    if (index === -1) return;
    const updatedItem = { ...cart[index], qty: cart[index].qty + 1 };
    const updatedCart = [...cart];
    updatedCart[index] = updatedItem;
    setCart(updatedCart);
    console.log(updatedCart);
  }

  //Reduce the Item QTY
  const removeQty = (id) => {
    const index = cart.findIndex((it) => it._id === id);  
    if (index === -1) return;
  
    if (cart[index].qty === 1) {
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);
      console.log(updatedCart);
      return;
    }
  
    const updatedItem = { ...cart[index], qty: cart[index].qty - 1 };
  
    const updatedCart = [...cart];
    updatedCart[index] = updatedItem;
  
    setCart(updatedCart);
  
    console.log(updatedCart);
  };
  

  return (
    <AuthContext.Provider value={{ userRole, login, logout, userToken, addItemToCart, removeItemFromCart, cart, addQty,removeQty }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
