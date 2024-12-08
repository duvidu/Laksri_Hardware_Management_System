import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate,useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import SimpleDialog from './FinalPage';
import './order.css';
import NavigationBar from '../Home/Home-Navigation';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openDialog, setOpenDialog] = useState(false);
    const [cvv, setCvv] = useState('');
    const [cvvError, setCvvError] = useState('');
    //Expiry date validation
    const [expiry, setExpiry] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);

    
    const totalPrice = location.state.totalPrice || 0 ;

    const handleCvvChange = (e) => {
        const { value } = e.target;
        // Validate CVV input
        if (value.length <= 3) {
          setCvv(value);
          setCvvError('');
        } else {
          setCvvError('CVV must be 3 digits');
        }
      };




const handleExpiryChange = (e) => {
  let value = e.target.value;
  // Validate MM/YY input
  if (value.length === 2 && value.charAt(2) !== '/') {
      value += '/';
  }
  setExpiry(value);

  const [monthString, yearString] = value.split('/');
  const month = parseInt(monthString, 10);
  const year = parseInt(yearString, 10);
  const currentYear = new Date().getFullYear() % 100;

  // Check if month is within the valid range (1 to 12) and year is valid
  if (
      month < 1 ||
      month > 12 ||
      isNaN(month) ||
      isNaN(year) ||
      year < currentYear
  ) {
      setExpiryError('Invalid expiry date');
  } else {
      setExpiryError('');
  }
};

const handleCardNumberChange = (e) => {
  let value = e.target.value;
  // Remove non-digit characters
  value = value.replace(/\D/g, '');
  // Add spaces after every 4 characters
  value = value.replace(/(.{4})/g, '$1 ').trim();
  setCardNumber(value);

  if (value.length !== 19) {
      setCardNumberError('Card number must be 16 digits');
  } else {
      setCardNumberError('');
  }
};

const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setOpenDialog(true);
    
    const paymentData = {
        cvv,
        expiry,
        cardNumber,
        totalPrice
    };

    // Send POST request
    fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        if (response.ok) {
            // Handle successful response
            console.log('Payment successful');
            setOpenDialog(true);
            setPaymentSubmitted(true);
        } else {
            // Handle error response
            console.error('Payment failed');
        }
    })
    .catch(error => {
        
        console.error('Error:', error);
    });
};

  
  return (
  <div>
    <NavigationBar/>
    <div className="Payment" style={{ display: 'flex', justifyContent: 'center' }}>
        
        <div>
        <h2>Payment Details</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column',width:'400px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> 
            <TextField
                
                label="Name on Card"
                id="cardName"
                name="cardName"
                required
                InputProps={{ inputProps: { pattern: '[A-Za-z ]+', title: 'Name cannot contain numbers' } }}
            />
            <TextField
                label="Card Number"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                
                required
                error={cardNumberError ? true : false}
                helperText={cardNumberError}
                
                
            />
            <TextField
                type="number"
                label="CVV"
                id="cvv"
                name="cvv"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3"
                required
                error={cvvError ? true : false}
                helperText={cvvError}
                InputProps={{ inputProps: { pattern: '[0-9]{0,3}', title: 'CVV must be 3 digits' } }}
            />
            <TextField
                
                label="Expiry MM/YY"
                id="expiry"
                name="expiry"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength="5"
                required
                error={expiryError ? true : false}
                helperText={expiryError}
                InputProps={{ inputProps: { pattern: '[0-9/]{0,5}', title: 'Invalid expiry date' } }}
            /></Box>
            <p className="totalPrice">Total Price: Rs {totalPrice}</p>
            <Button variant="contained" color="primary" type="submit" startIcon={<PaymentIcon />}>
                Pay Now
            </Button>
        </form>
        
        </div>
        {openDialog && <SimpleDialog onClose={() => setOpenDialog(false)} />}
    </div>
    </div>
);
};

export default PaymentPage;
