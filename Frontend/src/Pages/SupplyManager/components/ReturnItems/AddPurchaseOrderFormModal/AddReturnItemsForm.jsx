import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Stack, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, FormControlLabel, Switch } from '@mui/material';

function AddReturnItemForm({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        supplier: null,
        refundAmount: '',
        isRefunded: false,
        items: [],
    });

    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [productsForSelectedSupplier, setProductsForSelectedSupplier] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [serialNumber, setSerialNumber] = useState('');
    const [reasonForReturn, setReasonForReturn] = useState('');
    const [description, setDescription] = useState('');
    const [suppliers, setSuppliers] = useState([]);

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
        console.log("Selected supplier:", value);
        setSelectedSupplier(value);
        if (value) {
            setFormData({ ...formData, supplier: value });
            setProductsForSelectedSupplier(value.productsSupplied || []);
        } else {
            setFormData({ ...formData, supplier: null });
            setProductsForSelectedSupplier([]);
        }
    };
    console.log("supplier: ", selectedSupplier)

    const handleProductChange = (event, value) => {
    console.log("Selected product:", value);
    setSelectedProduct(value);
};

    
console.log("Product: ", selectedProduct)
    const handleAddItem = () => {
        if (selectedProduct && serialNumber && reasonForReturn && description) {
            setFormData({
                ...formData,
                items: [
                    ...formData.items,
                    {
                        product: selectedProduct,
                        serialNumber: serialNumber,
                        returnType: reasonForReturn,
                        description: description,
                    },
                ],
            });
            //setSelectedProduct(null);
            setSerialNumber('');
            setReasonForReturn('');
            setDescription('');
        }
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...formData.items];
        updatedItems.splice(index, 1);
        setFormData({ ...formData, items: updatedItems });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Prepare items array based on selected products
        const items = formData.items.map(item => ({
            serialNumber: item.serialNumber,
            returnType: item.reasonForReturn,
            description: item.description,
        }));
    
        // Prepare data for submission
        const returnItemData = {
            product: selectedProduct._id,
            supplier: selectedSupplier._id,
            items: items,
            amount: parseFloat(formData.refundAmount),
            isRefunded: formData.isRefunded,
            returnedDate: new Date(), 
            refundedDate: formData.isRefunded ? new Date() : null,
        };
    
        // Submit the data
        await onSubmit(returnItemData);
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
                <h2 id="add-return-item-modal-title">Add Return Item</h2>
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
                            label="Refund Amount"
                            name="refundAmount"
                            type="number"
                            value={formData.refundAmount}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <FormControlLabel
                            control={<Switch
                                checked={formData.isRefunded}
                                onChange={(event) => setFormData({ ...formData, isRefunded: event.target.checked })}
                            />}
                            label="Is Refunded"
                        />
                        <Autocomplete
                            options={productsForSelectedSupplier}
                            getOptionLabel={(product) => product.name}
                            renderInput={(params) => <TextField {...params} label="Select Product" />}
                            onChange={handleProductChange}
                            value={selectedProduct}
                            fullWidth
                        />
                        <TextField
                            label="Serial Number"
                            name="serialNumber"
                            value={serialNumber}
                            onChange={(event) => setSerialNumber(event.target.value)}
                            fullWidth
                            
                        />
                        <TextField
                            label="Reason for Return"
                            name="reasonForReturn"
                            value={reasonForReturn}
                            onChange={(event) => setReasonForReturn(event.target.value)}
                            fullWidth
                            
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            fullWidth
                            
                        />
                        {formData.items.length > 0 && (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Serial Number</TableCell>
                                            <TableCell>Reason for Return</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formData.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.serialNumber}</TableCell>
                                                <TableCell>{item.reasonForReturn}</TableCell>
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleRemoveItem(index)} color="error">
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        <Button onClick={handleAddItem} variant="contained" color="primary">
                            Add Item
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add Return Item
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

export default AddReturnItemForm;
