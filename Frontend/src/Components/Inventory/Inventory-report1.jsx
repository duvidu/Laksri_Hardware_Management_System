import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import formatNumber from 'format-number';
import { Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Report1 = () => {
    const componentPDF = useRef();
    const [products, setProducts] = useState([]);

    // Define options for formatting
    const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/inventory');
                const data = await response.json();
                if (response.ok) {
                    setProducts(data);
                } else {
                    throw new Error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    //Function to group products by category and calculate product count and total value
    const groupProductsByCategory = () => {
        const groupedProducts = {};
        products.forEach((product) => {
            if (!groupedProducts[product.category]) {
                groupedProducts[product.category] = {
                    products: [],
                    itemCount: 0,
                    totalValue: 0,
                };
            }
            groupedProducts[product.category].products.push(product);
            groupedProducts[product.category].itemCount += product.quantity;
            groupedProducts[product.category].totalValue += product.price * product.quantity;
        });
        return groupedProducts;
    };

    const groupedProducts = groupProductsByCategory();

    const generateReport = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Inventory data list",
        onAfterPrint: () => alert("Inventory list downloaded")
    });

    return (
        <div style={{ textAlign: 'center', margin: '20px 60px', display: 'flex', flexDirection: 'column' }}>
            <div ref={componentPDF} style={{ width: '60%', padding: '10px', alignSelf: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Inventory Report
                </Typography>
                {Object.keys(groupedProducts).map((category) => (
                    <div key={category} style={{ marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            {category}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table  style={{ border: '2px solid #ccc'}}>
                                <TableHead>
                                    <TableRow style={{ border: '2px solid #ccc'}}>
                                        <TableCell>Name</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>Price (Rs)</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>Quantity</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>Total value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groupedProducts[category].products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell style={{ textAlign: 'right' }}>{product.price && formatNumber(options)(parseFloat(product.price))}</TableCell>
                                            <TableCell style={{ textAlign: 'right' }}>{product.quantity}</TableCell>
                                            <TableCell style={{ textAlign: 'right' }}>{product.price && product.quantity && formatNumber(options)(parseFloat(product.price) * parseFloat(product.quantity))}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow style={{ border: '2px solid #ccc'}}>
                                        <TableCell colSpan="2"></TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{groupedProducts[category].itemCount}</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{groupedProducts[category].totalValue && formatNumber(options)(parseFloat(groupedProducts[category].totalValue))}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))}
            </div>
            <div style={{ alignSelf: 'center', margin: '20px' }}>
                <Button variant="contained" onClick={generateReport}>Print</Button>
            </div>
        </div>
    );
};

export default Report1;
