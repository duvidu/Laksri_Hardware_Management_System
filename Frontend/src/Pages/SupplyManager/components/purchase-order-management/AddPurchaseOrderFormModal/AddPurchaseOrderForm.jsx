import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Stack, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem } from '@mui/material';


function AddOrderForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        
        supplier: '', // Changed to store supplier's ObjectId
        totalAmount: 0,
        status: '',
        receivedDate: '',
        products: [], // Array to hold products
    });

    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [productsForSelectedSupplier, setProductsForSelectedSupplier] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        // Fetch suppliers
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:8000/supply-management/suppliers');
                if (response.ok) {
                    const data = await response.json();
                    setSuppliers(data);
                } else {
                    console.error('Failed to fetch suppliers');
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSupplierChange = (event, value) => {
        setSelectedSupplier(value);
        if (value) {
            setFormData({ ...formData, supplier: value._id }); // Store supplier's ObjectId
            setProductsForSelectedSupplier(value.productsSupplied || []);
        } else {
            setFormData({ ...formData, supplier: '' });
            setProductsForSelectedSupplier([]);
        }
    };

    const handleProductChange = (event, value) => {
        setSelectedProduct(value);
        
        if (value) {
            setUnitPrice(value.unitPrice);
            setQuantity(1); // Set default quantity to 1
        } else {
            setUnitPrice('');
            setQuantity('');
        }
    };

    const handleAddProduct = () => {
        if (selectedProduct && unitPrice && quantity) {
            const productPrice = parseFloat(unitPrice) * parseInt(quantity);
            const updatedTotalAmount = parseFloat(formData.totalAmount) + productPrice;
            setFormData({
                ...formData,
                totalAmount: updatedTotalAmount,
                products: [
                    ...formData.products,
                    {
                        productId: selectedProduct._id, // Store product's ObjectId
                        productName: selectedProduct.name,
                        unitPrice: unitPrice,
                        quantity: quantity,
                    },
                ],
            });
            setSelectedProduct(null);
            setUnitPrice('');
            setQuantity('');
        }
    };

    const handleRemoveProduct = (index) => {
        const productToRemove = formData.products[index];
        const productPrice = parseFloat(productToRemove.unitPrice) * parseInt(productToRemove.quantity);
        const updatedTotalAmount = formData.totalAmount - productPrice;
        const updatedProducts = [...formData.products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, products: updatedProducts, totalAmount: updatedTotalAmount });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Prepare items array based on selected products
        const items = formData.products.map(product => ({
            item: product.productId,
            quantity: product.quantity,
            unitPrice: product.unitPrice
        }));

        // Prepare data for submission
        const orderData = {
            orderNumber: formData.orderNumber,
            supplier: selectedSupplier ? selectedSupplier._id : '', // Correctly set supplier's ObjectId
            totalAmount: parseFloat(formData.totalAmount),
            status: formData.status,
            receivedDate: formData.receivedDate,
            items: items,
        };

        // Submit the data
        await onSubmit(orderData);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                    maxWidth: 800,
                    overflowY: 'auto',
                    maxHeight: '95vh',
                    zIndex: 9999,
                }}
            >
                <h2 id="add-order-modal-title">Add Purchase Order</h2>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        
                        <Autocomplete
                            options={suppliers}
                            getOptionLabel={(supplier) => supplier.name}
                            renderInput={(params) => <TextField {...params} label="Select Supplier" />}
                            onChange={handleSupplierChange}
                            value={selectedSupplier}
                            fullWidth
                        />
                        <TextField
                            label="Total Amount"
                            name="totalAmount"
                            type='number'
                            value={formData.totalAmount}
                            onChange={handleChange}
                            fullWidth
                            disabled
                            required
                        />
                        <TextField
                            label="Status"
                            name="status"
                            select
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {['Pending', 'Cancelled', 'Received'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Receiving Date"
                            name="receivedDate"
                            type="date"
                            value={formData.receivedDate}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        {/* Product selection */}
                        <Stack direction="row" spacing={2} alignItems="center">
                        <Autocomplete
                            options={productsForSelectedSupplier}
                            getOptionLabel={(product) => product.name}
                            renderInput={(params) => <TextField {...params} label="Select Product" />}
                            onChange={handleProductChange}
                            value={selectedProduct}
                            fullWidth
                        />
                        {/* Unit Price and Quantity */}
                        <TextField
                            label="Unit Price"
                            name="unitPrice"
                            type="number"
                            value={unitPrice !== null ? unitPrice : ''}
                            onChange={(event) => setUnitPrice(event.target.value !== '' ? parseFloat(event.target.value) : null)}
                            fullWidth
                        />

                        <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={quantity !== null ? quantity : ''}
                            onChange={(event) => setQuantity(event.target.value !== '' ? parseInt(event.target.value) : null)}
                            fullWidth
                        />
                        </Stack>
                        {formData.products.length > 0 && <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {formData.products.map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{product.productName}</TableCell>
                                            <TableCell align="right">Rs.{product.unitPrice}</TableCell>
                                            <TableCell align="right">{product.quantity}</TableCell>
                                            <TableCell align="right">
                                                <Button onClick={() => handleRemoveProduct(index)} color="error">Remove</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                        <Button onClick={handleAddProduct} variant="contained" color="primary">
                            Add Product
                        </Button>
                        {/* List of added products */}
                        {/* List of added products */}
                        
                        <Button type="submit" variant="contained" color="primary">
                            Add Order
                        </Button>
                        <Button variant="contained" color="error" onClick={onClose}>
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}

export default AddOrderForm;
