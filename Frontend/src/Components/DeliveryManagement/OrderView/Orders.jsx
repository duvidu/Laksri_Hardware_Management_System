import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [shippingAddresses, setShippingAddresses] = useState([]);

  useEffect(() => {
    const fetchShippingAddresses = async () => {
      try {
        // Simulate fetching shipping addresses after a delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Sample shipping address data
        const sampleData = [
          {
            id: 1,
            name: 'John Doe',
            address: '123 Main St, City, Country',
            phone: '+1234567890'
          },
          {
            id: 2,
            name: 'Jane Smith',
            address: '456 Elm St, Town, Country',
            phone: '+0987654321'
          },
          {
            id: 3,
            name: 'Alice Johnson',
            address: '789 Oak St, Village, Country',
            phone: '+1122334455'
          }
        ];
        setShippingAddresses(sampleData);
      } catch (error) {
        console.error('Error fetching shipping addresses:', error);
      }
    };

    fetchShippingAddresses();
  }, []);

  return (
    <div>
      <h2>Shipping Addresses</h2>
      <ul>
        {shippingAddresses.map(address => (
          <li key={address.id}>
            <div>{address.name}</div>
            <div>{address.address}</div>
            <div>{address.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
