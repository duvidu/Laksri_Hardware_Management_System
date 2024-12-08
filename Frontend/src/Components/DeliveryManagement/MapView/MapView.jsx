import React, { useState, useRef } from 'react';
import { Grid, Paper, Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';



const MapView = ( ) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyANu8c_NzURmzwkBfT3zkutCk8cOcRCsQo'
  });

  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState('');
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);


  const mapRef = useRef();

  const handleFindLocation = () => {


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleMapClick = (e) => {
    setDestinationCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleDirections = (  ) => {
    ///const [ShippingAddressCopy, SetShippingAddressCopy] = useState([]);
    
  

    if (navigator.geolocation) {
      // Find current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
  
          // Search for destination
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: destination }, (results, status) => {
            if (status === 'OK') {
              setDestinationCoordinates(results[0].geometry.location.toJSON());
  
              // Get directions
              const directionsService = new window.google.maps.DirectionsService();
              directionsService.route(
                {
                  origin: { lat: latitude, lng: longitude },
                  destination: results[0].geometry.location.toJSON(),
                  travelMode: 'DRIVING'
                },
                (result, status) => {
                  if (status === 'OK') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setDirections(result);
                  } else {
                    console.error('Directions request failed:', status);
                  }
                }
              );
            } else {
              console.error('Geocoding request failed:', status);
            }
          });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);

  };

  const handleSearchDestination = () => {
    if (destination.trim() !== '') {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === 'OK') {
          setDestinationCoordinates(results[0].geometry.location.toJSON());
        } else {
          console.error('Geocoding request failed:', status);
        }
      });
    }
  };

  const handleCalculateDistance = () => {
    if (currentPosition && destinationCoordinates) {
      const distanceMatrixService = new window.google.maps.DistanceMatrixService();
      distanceMatrixService.getDistanceMatrix(
        {
          origins: [currentPosition],
          destinations: [destinationCoordinates],
          travelMode: 'DRIVING'
        },
        (response, status) => {
          if (status === 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
            const duration = response.rows[0].elements[0].duration.text;
            setDistance(distance);
            setDuration(duration);
            // Scroll to the top of the page
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

          } else {
            console.error('Distance matrix request failed:', status);
          }
        }
      );
    }
  }; 


  const PaperStyle = { width: 805, marginTop: "20px", marginLeft: "28px", height: "640px"  }; //height = 550
  const PaperStyle2 = { width: 810 , marginTop: "20px", marginLeft: "25px", marginBottom: "10px" ,   padding: "10px 10px",  height: "400px" , border: '2px solid #86E212'  }; //border: '2px solid #86E212'
  //const PaperStyle3 = { padding: "30px 30px", width: 820, margin: "15px 0px", height: "300px" };

  return (


    <div>


      <Grid >
        <Paper elevation={5} style={PaperStyle} sx={{ borderRadius: 2 }}>
          <div style={{ width: '100%', height: '100%' }}>
            {isLoaded && (
              <GoogleMap
                ref={mapRef}
                onClick={handleMapClick}
                center={currentPosition || { lat: 7.8731, lng: 80.7718 }}
                zoom={currentPosition ? 17 : 7.5}
                mapContainerStyle={{ width: '100%', height: '100%', borderRadius: 8 }} // Apply border radius here
              >
                {currentPosition && <Marker position={currentPosition} />}
                {destinationCoordinates && <Marker position={destinationCoordinates} />}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            )}
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={10} style={PaperStyle2} sx={{ borderRadius: 2, padding: "30px 30px", backgroundColor: "", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>

          <div style={{ margin: "30px"  }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" style={{ marginBottom: "10px" }}>
                  Total Distance - {distance}
                </Typography>
              
              </CardContent>
            </Card>
          </div>
          <div style={{ margin: "30px"  }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" style={{ marginBottom: "10px" }}>
                  Total Duration - {duration}
                </Typography>
       
              </CardContent>
            </Card>
          </div>

          <div style={{ marginBottom: "20px"  , paddingLeft: "2px"}}>
            <input type="text" value={destination} onChange={handleChangeDestination} placeholder="Enter Destination" style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "625px" }} />
            <Button variant='outlined'  onClick={handleSearchDestination} style={{ width: "80px" , marginLeft: "10px", borderRadius: "5px" , padding: "8px"}}>Search</Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <Button variant='contained' color="primary" onClick={handleFindLocation} style={{ borderRadius: "10px", width: "80%", margin: "5px" }}>Find My Location</Button>
            <Button variant='contained' color="primary" onClick={handleDirections} style={{ borderRadius: "10px", width: "80%", margin: "5px" }}>Get Directions</Button>
            <Button variant='contained' color="primary" onClick={handleCalculateDistance} style={{ borderRadius: "10px", width: "80%", margin: "5px" }}>Calculate Distance</Button>
          </div>

         
        </Paper>
      </Grid>


      {/* <Grid>
        <Paper elevation={10} style={PaperStyle3} sx={{ borderRadius: 5 , padding: "30px 30px" }}>
          
        </Paper>
      </Grid> */}

    </div>
  );
};

export default MapView;
