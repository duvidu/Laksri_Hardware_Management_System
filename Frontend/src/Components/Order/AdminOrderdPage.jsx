import React, { useEffect, useState } from 'react';
import './order.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import RatingPage from './RatingComponent'

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/order')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filtered = orders.filter(order => {
            return order.carts.some(cart => {
                return cart.cartItems.some(item => {
                    return item.product.name.toLowerCase().includes(searchTerm.toLowerCase());
                });
            });
        });
        setFilteredOrders(filtered);
    };

    

    const generateReport = () => {
        window.print();
    };

    const filterOrders = () => {
        let filtered = orders;

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
            });
        }

        // Filter by total price range
        if (minPrice && maxPrice) {
            filtered = filtered.filter(order => order.totalPrice >= parseFloat(minPrice) && order.totalPrice <= parseFloat(maxPrice));
        }
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(order =>
                order.carts.some(cart =>
                    cart.cartItems.some(item =>
                        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            );
        }

        setFilteredOrders(filtered);
    };

    useEffect(() => {
        filterOrders();
    }, [startDate, endDate, minPrice, maxPrice,searchTerm]);

    

    const getAllOrders = () => {
        setStartDate('');
        setEndDate('');
        setMinPrice('');
        setMaxPrice('');
        // Fetch orders from the backend
        fetch('http://localhost:8000/order')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    };
    
    // const handleViewRatings = async(productId) => {
    //     setSelectedProduct(productId);
        
    // };
    
    return (
        <div>
            <h2 className="OrderH2"><strong>Order Details</strong></h2>
            <div>
                <input className="ratingFont"
                    type="text"
                    placeholder="Search by item name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                
                <label className="ratingFont" htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label className="ratingFont" htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <label className="ratingFont" htmlFor="minPrice">Min Price:</label>
                <input type="number" id="minPrice" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <label className="ratingFont" htmlFor="maxPrice">Max Price:</label>
                <input type="number" id="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={getAllOrders}>Get all orders</Button>
                </Stack>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : filteredOrders.length === 0 ? (
                <p>No orders available</p>
            ) : (
                <div className="Order">
                    {filteredOrders.map((order, index) => (
                        <div key={index}>
                            <h3 className="orderHeader">Order {index + 1}</h3>
                            <p className="Total">Total Price: {order.totalPrice}</p>
                            <table className="cart-table-head" >
                                <thead>
                                    <tr>
                                        <th className='Product-h'>Product</th>
                                        <th className='Quantity-h'>Quantity</th>
                                        <th className='Price-h'>Price</th>
                                    </tr>
                                </thead>
                            </table>
                            {order.carts.map((cart, cartIndex) => (
                                <div key={cartIndex}>
                                    <table className="cart-table-body">
                                        <thead>
                                            {cart.cartItems.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td className='Product-b'>
                                                        <img src={`http://localhost:8000/images/${item.product.img_URL}`} alt={item.product.name} style={{ width: '50px', height: '50px' }} />
                                                        {item.product ? item.product.name : 'Product Name Not Available'}
                                                    </td>
                                                    <td className='Quantity-b'>{item.quantity}</td>
                                                    <td className='Price-b'>{item.price}</td>
                                                </tr>
                                            ))}
                                        </thead>
                                    </table>
                                </div>
                            ))}
                            <hr className="bold-hr" />
                            
                        </div>
                    ))}
                </div>
            )}
            <button className="generate-report-btn" onClick={generateReport}>Generate Report</button>
        </div>
    );
};

export default OrderPage;
