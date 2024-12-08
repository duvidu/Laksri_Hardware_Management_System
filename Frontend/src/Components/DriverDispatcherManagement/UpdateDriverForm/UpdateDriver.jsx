import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateDriverForm() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    licenseNumber: '',
    vehicleType: '',
    availabilityStatus: '',
    rating: '',
  });

  useEffect(() => {
    
    const fetchData = async () => {
        
      if (driverId) {
        try {
            
          const response = await axios.get(`http://localhost:8000/driver-dispatcher/${driverId}`);
          setFormData(response.data);
          console.log( " updated data ", response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [driverId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    navigate('/driver-dispatcher'); // Navigate programmatically to '/drivers' route
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8000/driver-dispatcher/${driverId}`, formData);
      console.log(response.data);
      navigate('/driver-dispatcher'); // Redirect to the home page URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">
            License Number
          </label>
          <input
            type="text"
            className="form-control"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="vehicleType" className="form-label">
            Vehicle Type
          </label>
          <select
            className="form-select"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="bike">Bike</option>
            <option value="truk">Truk</option>
            <option value="lorry">Lorry</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="availabilityStatus" className="form-label">
            Availability Status
          </label>
          <select
            className="form-select"
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability Status</option>
            <option value="available">Available</option>
            <option value="notAvailable">Not Available</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>

        <button
            type="submit"
            className="btn btn-primary submit_before_viewDrivers"
            style={{ marginRight: '10px' }}
          >
            Submit
          </button>

          <button
            type="button"
            className="btn btn-primary view_drivers"
            onClick={handleClick}
            style={{ marginLeft: '1000px' }}
          >
            View Drivers
          </button>
          
        </div>
      </form>
    </div>
  );
}
