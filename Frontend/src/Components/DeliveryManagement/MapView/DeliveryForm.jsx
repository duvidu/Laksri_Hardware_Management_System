import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS

// import { useSelector } from 'react-redux';
// import { selectDestinationAddress } from './ReduxToolKit/destinationSlice';

import axios from "axios";
import { Button, Card, CardContent, Typography, Grid, Container, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TextField, Box, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import MapView from './MapView';




const FormSide = ({ ShippingAddressCopy, handleFetchData, sampleData, deliveryCost, setDeliveryCost }) => {

  //const destinationAddress = useSelector(selectDestinationAddress);

  const PaperStyle = { padding: "20px 20px", width: 390, marginTop: "20px", height: "410px" }; //border: '2px solid #F8CD4E'
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const [shippingAddress, setShippingAddress] = useState('');
  const [selectVehicle, setSelectVehicle] = useState('');
  //const [deliveryCost, setDeliveryCost] = useState('');
  const [estimateTime, setEstimateTime] = useState('');

  //for ordersView
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  //  const [getshippingAddress, setGetShippingAddress] = useState('');



  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedVehicleData = sampleData.find(vehicle => vehicle.name === selectedVehicle);

    if (!selectedVehicleData) {
      setErrorMessage("Selected Vehicle is not available!");
    } else if (selectedVehicleData.availability === 'notAvailable') {
      setErrorMessage("Selected Vehicle is not available!");
    } else {
      console.log("Form data to be submitted:", {
        shippingAddress,
        selectedVehicle,
        deliveryCost,
        estimateTime
      });

      if (!Number.isInteger(parseInt(deliveryCost))) {
        toast.error('Delivery Cost must be an integer');
        return;
      }

      if (!Number.isInteger(parseInt(estimateTime))) {
        toast.error('Estimate Time must be an integer');
        return;
      }

      axios.put(`http://localhost:8000/VehicleUpdateDelete/VehicleUpdateDelete/${selectedVehicleData._id}`, { availability: 'notAvailable' })
        .then(res => {
          console.log("Vehicle availability updated successfully!");
          toast.success("Delivery created successfully!");
          //console.log("Response from server:", res.data);
          //console.log(selectedVehicleData)


          setTimeout(() => {
            navigate('/MapView');
          }, 2000); // 2000 milliseconds = 5 seconds
          
          
          // window.location.reload(); // Refresh the page


        })
        .catch(err => console.log(err, selectVehicle));

      axios.post('http://localhost:8000/CreateDelivery/CreateDelivery', { shippingAddress, selectedVehicle, deliveryCost, estimateTime })
        .then(res => {
          //alert("Delevery created successfully!");
          // Redirect to a different route after successful submission
          // navigate('/'); 
          window.location.reload()
        })
        .catch(err => console.log(err));
    }
  };

  const showOrderData = () => {
    console.log("Order Data button clicked"); // this line for debugging
    // Sample shipping address data
    const sampleShippingAddresses = [
      {
        id: 1,
        OrderId: '#7645374820',
        name: 'Gayan Kulathunga',
        address: '1st lane, Yasorapura , Attidiya , Dehiwala',
        phone: '+1234567890'
      },
      {
        id: 2,
        OrderId: '#0836457309',
        name: 'Nishadi Ganegoda',
        address: '281/1/m, sunrise city, pore, athurugiriya',
        phone: '+0987654321'
      },
      {
        id: 3,
        OrderId: '#6486726459',
        name: 'Kasuni Thisarika ',
        address: 'Reka , polhidigoda,godagama , matara',
        phone: '+1122334455'
      },
      {
        id: 4,
        OrderId: '#8647638298',
        name: 'Deshan Thranga ',
        address: '51/8E,Dimitiyagahawatta Road,Dambahena , Maharagaman',
        phone: '+1122334455'
      }
    ];
    setShippingAddresses(sampleShippingAddresses);
    //console.log("Shipping addresses:", sampleShippingAddresses); // Add this line for debugging
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  

  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle} sx={{ padding: 1, backgroundColor: "", borderRadius: 2, width: "80%", marginTop: "7px" }}>
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit} >
          <TextField fullWidth
            label="Shipping Address"
            variant="standard"
            value={ShippingAddressCopy}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />

          <TextField
            select
            fullWidth
            label="Select Vehicle"
            variant="standard"
            value={selectedVehicle}
            onChange={handleVehicleChange} >
            {sampleData.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.name}>{vehicle.name}   {vehicle.model}</MenuItem>
            ))}
          </TextField>

          {errorMessage && <Typography color="error">{errorMessage}</Typography>}

          <TextField
            fullWidth
            label="Delivery Cost"
            variant="standard"
            value={deliveryCost}
            onChange={(e) => setDeliveryCost(e.target.value)}
            required />

          <TextField
            fullWidth
            label="Estimate Time(Hours.Mintes)"
            variant="standard"
            value={estimateTime}
            onChange={(e) => setEstimateTime(e.target.value)}
            required />
          {/* //FFA500 */}

          

          <Button type="submit" variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#F8CD4E', fontWeight: "bold", marginTop: 3, borderRadius: 1 }}>Submit</Button>
          <container >
            <Button component={Link} to='/Deliveryinfofromorder' variant="outlined" sx={{ width: '45%', height: '35px', bgcolor: '', marginTop: 2, borderRadius: 1 }}>Order Data</Button>
            <Button onClick={handleFetchData} variant="outlined" sx={{ width: '45%', height: '35px', bgcolor: '', marginTop: 2, marginLeft: 4, borderRadius: 1 }}>Vehicle Data</Button>
          </container>


        </form>

      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Shipping Addresses</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {shippingAddresses.map((address) => (
              <Grid item xs={12} key={address.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{address.name}</Typography>
                    <Typography>Order ID - {address.OrderId}</Typography>
                    <Typography>Order Address -{address.address}</Typography>
                    <Typography>Phone -{address.phone}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>Close</Button>
        </DialogActions>
      </Dialog>

    </Grid>

  );
};

const DeliveryCostCalculationForm = ({ updateDeliveryCost }) => {
  const [totalDistance, setTotalDistance] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState('');
  const PaperStyle2 = { padding: "12px 20px", width: 390, marginTop: "15px", height: "215px", marginRight: "10px" }; //border: '2px solid #F8CD4E'

  const calculateDeliveryCost = () => {
    const distance = parseFloat(totalDistance);
    let cost = 0;
    if (distance <= 50) {
      cost = 360;
    } else if (distance > 50 && distance < 100) {
      cost = 590;
    } else {
      cost = 590 + (distance - 100) * 100;
    }
    if (isUrgent) {
      cost = cost + 1000;
    }
    setDeliveryCost(cost); // Update the deliveryCost state with the calculated value
    updateDeliveryCost(cost);


    //console.log(onDestinationChange)


    // if destination is <= 50 price must be normal price = 360 rupee,if destination > 50  and destination < 100 price will be = 590 rupee , 
    //and if kilometers are exceed from 100 , calcution additional add 100 rupee for per killometer.
    // and there is a checkbox  called urgent,urgent deliveries have fix price which is 1000 rupee  

  };

  return (

    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle2} sx={{ padding: 2, backgroundColor: '#FFFFFF', borderRadius: 2, width: '80%', height: 300, margin: '15px 0px' }}>
        <h4>Delivery Cost Calculation</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextField
            sx={{ width: '300px', height: '50px' }}
            label="Enter Total Distance (in kilometers)"
            variant="standard"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                name="urgent"
                color="primary"
              />
            }
            label="Urgent Delivery (+1000 rupee)"
          />
          <br />
          <Button
            variant="contained"
            sx={{ width: '30%', height: '54px', bgcolor: '#F8CD4E', fontWeight: "bold", marginTop: 0, borderRadius: 1 }}
            onClick={calculateDeliveryCost}
          >
            Calculate
          </Button>

          <TextField
            sx={{ width: '60%', height: '5%', marginTop: 0, marginLeft: 2 }}
            label="Delivery Cost (in rupees)"
            variant="outlined"
            disabled
            value={deliveryCost}
          />
        </form>
      </Paper>

    </Grid>
  );
};


const InfoForm = () => {
  const PaperStyle = { padding: "30px 30px", width: 390, margin: "5px 0px", height: "400px" } //
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={3} style={PaperStyle} sx={{ paddingRight: 2, backgroundColor: "#ffffff", borderRadius: 2, width: "80%", height: 300, alignItems: "center" }}>
        <h2 >About our Services</h2>
        <br></br>
        <h6>At Laksiri Hardware, we pride ourselves on offering comprehensive and reliable delivery services tailored to meet the diverse needs of our clients. With a focus on efficiency, flexibility, and customer satisfaction, we strive to exceed expectations in every aspect of our operations.</h6>
        <Link to="/vehicleView" underline="none">
          <Button variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#F8CD4E', marginTop: 3, borderRadius: 1 }}>
            View Vehicles
          </Button>
        </Link>
        <Link to="/DeliveryView" underline="none">
          <Button variant="contained" sx={{ width: '100%', height: '35px', bgcolor: '#F8CD4E', marginTop: 3, borderRadius: 1 }}>
            View Deliveries
          </Button>
        </Link>
      </Paper>
    </Grid>
  );
};

const DeliveryForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState('');

  const handleDeliveryCostUpdate = (cost) => {
    setDeliveryCost(cost);
    //set delivery cost 
  };


  const handleFetchData = () => {
    axios.get("http://localhost:8000/VehicleView/VehicleView")
      .then(res => {
        setSampleData(res.data); // Set the fetched data to sampleData
        setOpenDialog(true);
      })
      .catch(err => console.log(err));
  };




  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const updateDeliveryCost = (cost) => {
    setDeliveryCost(cost);
  };


  return (
    <Container>
      <Grid container spacing={2}>
        {/* <FormSide handleFetchData={handleFetchData} sampleData={sampleData} /> */}
        <FormSide handleFetchData={handleFetchData} sampleData={sampleData} deliveryCost={deliveryCost} setDeliveryCost={setDeliveryCost} />
      </Grid>
      <Grid container spacing={2}>
        {/* <DeliveryCostCalculationForm updateDeliveryCost={setDeliveryCost} /> */}
        <DeliveryCostCalculationForm updateDeliveryCost={handleDeliveryCostUpdate} />
      </Grid>
      <Grid container spacing={2}>
        <InfoForm />
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Vehicle Data!</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {sampleData.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                <Card style={{ width: '180px', backgroundColor: vehicle.availability === 'notAvailable' ? 'red' : '#E3FDFD' }}>
                  <CardContent style={{ padding: '20px', width: '200px' }}>
                    <Typography variant="h3">{vehicle.id}</Typography>
                    <Typography variant="subtitle1">{vehicle.name}</Typography>
                    <Typography variant="body2">Model: {vehicle.model}</Typography>
                    <Typography variant="body2">Milage: {vehicle.millage}</Typography>
                    <Typography variant="body2">Status: {vehicle.availability}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer /> {/* Add ToastContainer */}
      {/* <DeliveryCostCalculationForm updateDeliveryCost={handleDeliveryCostUpdate} /> */}
      {/* <FormSide sampleData={sampleData} deliveryCost={deliveryCost} setDeliveryCost={setDeliveryCost} /> */}

    </Container>
  );
};

export default DeliveryForm;
