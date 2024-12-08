import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import './InventoryStyles.css';

const InventoryHome = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [pricebeforeDiscount, setpricebeforeDiscount] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityLimit, setQuantityLimit] = useState('');
    const [discount, setDiscount] = useState('');
    const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [displayItem, setDisplayItem] = useState(true);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState('');
    const [brands, setBrands] = useState([]);

    // Fetch categories from the backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError('Error has been occurred. Please try again.');
            }
        };
        fetchCategories();
    }, []); // empty dependency array to run this effect only once

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('http://localhost:8000/brands');
                if (!response.ok) {
                    throw new Error('Failed to fetch brands');
                }
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brands:', error.message);
            }
        };

        fetchBrands();
    }, []);

    // Calculate price after discount 
    useEffect(() => {
        if (pricebeforeDiscount && discount) {
            const discountedPrice = parseFloat(pricebeforeDiscount) - (parseFloat(pricebeforeDiscount) * parseFloat(discount) / 100);
            setPriceAfterDiscount(discountedPrice.toFixed(2));
        }
    }, [pricebeforeDiscount, discount]);

    // Form validation function
    const validateForm = () => {
        // Function to validate numeric input 
        const validateNumberInput = (value) => {
            const parts = value.split('.');
            if (parts.length > 2 || (parts[1] && parts[1].length > 2)) {
                return false;
            }
            return true;
        }

        if (!validateNumberInput(pricebeforeDiscount) || !validateNumberInput(buyingPrice) || !validateNumberInput(quantity) 
        || !validateNumberInput(quantityLimit) || !validateNumberInput(discount)) {
            setError('Please enter valid values with up to 2 decimal places');
            return false;
        }

        if (!name || !category || !pricebeforeDiscount || !buyingPrice || !quantity || !quantityLimit || !discount || !description || !image) {
            setError('Please fill in all fields.');
            return false;
        }

        if (parseFloat(priceAfterDiscount) <= parseFloat(buyingPrice)) {
            setError('Price after discount must be greater than buying price.');
            return false;
        }

        if (parseFloat(quantity) < 0 || parseFloat(quantityLimit) < 0) {
            setError('Quantity and minimum quantity can not be less than 0.');
            return false;
        }
        return true;
    }


    const handleInventoryFrom = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('price', priceAfterDiscount);
        formData.append('pricebeforeDiscount', pricebeforeDiscount); 
        formData.append('buyingPrice', buyingPrice);
        formData.append('discount', discount);
        formData.append('quantity', quantity);
        formData.append('quantityLimit', quantityLimit);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('displayItem', displayItem);

        try {
            const response = await fetch('http://localhost:8000/inventory', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                window.alert('Unable to add New Product !');
                navigate(`/inventory`);
                throw new Error(data.error);
            } else {
                window.alert('New Product Successfully Added');
                navigate(`/inventory`);
            }

            // Clear form fields
            setName('');
            setCategory('');
            setBrand('');
            setBuyingPrice('');
            setpricebeforeDiscount('');
            setQuantity('');
            setQuantityLimit('');
            setImage(null);
            setError(null);
            setDiscount('');
            setDescription('');
            setDisplayItem(true);
            console.log('New product added', data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="newItem-form" onSubmit={handleInventoryFrom}>
            <Grid container spacing={0.8}>
                <Grid item xs={12}>
                    <TextField
                        label="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Item Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        required
                    >
                        {categories.map((option) => (
                            <MenuItem key={option._id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        fullWidth
                        required
                    >
                        {brands.map((option) => (
                            <MenuItem key={option._id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Selling Price"
                        value={pricebeforeDiscount}
                        onChange={(e) => setpricebeforeDiscount(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Buying Price"
                        value={buyingPrice}
                        onChange={(e) => setBuyingPrice(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Minimum Quantity"
                        value={quantityLimit}
                        onChange={(e) => setQuantityLimit(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Discount %"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        label="Price after discount"
                        value={priceAfterDiscount}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextareaAutosize
                        rowsMin={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={displayItem} onChange={(e) => setDisplayItem(e.target.checked)} />}
                        label="Display Item"
                    />
                </Grid>
            </Grid>

            <Button variant="contained" color="primary" type="submit">
                Add Item
            </Button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InventoryHome;
