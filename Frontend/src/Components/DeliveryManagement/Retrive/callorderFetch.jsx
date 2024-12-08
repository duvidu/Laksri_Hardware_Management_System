import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherComponent = () => {
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/employees")
      .then(res => {
        setDeliveryInfo(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCountClick = () => {
    setShowDetails(!showDetails); // Toggle the showDetails state when count is clicked
  };

  return (
    <div>
      <h2>Other Component</h2>
      <div onClick={handleCountClick} style={{ cursor: 'pointer' }}>
        <p>Employee Count: {deliveryInfo.length}</p>
      </div>
      {showDetails && (
        <div>
          {deliveryInfo.map(employee => (
            <div key={employee.id}>
              <p>Name: {employee.name}</p>
              <p>Email: {employee.email}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherComponent;
