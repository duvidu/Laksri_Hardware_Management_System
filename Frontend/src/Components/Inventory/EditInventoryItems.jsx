import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Grid, MenuItem, Checkbox, FormControlLabel, TextareaAutosize } from "@mui/material";
import './InventoryStyles.css';

const EditInventoryItems = ({ product }) => {
  const { id } = useParams();

  // initialise state variables with existing values
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [pricebeforeDiscount, setPricebeforeDiscount] = useState(product.pricebeforeDiscount); 
  const [quantity, setQuantity] = useState(product.quantity);
  const [quantityLimit, setQuantityLimit] = useState(product.quantityLimit);
  const [buyingPrice, setBuyingPrice] = useState(product.buyingPrice);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [description, setDescription] = useState(product.description);
  const [displayItem, setDisplayItem] = useState(product.displayItem);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState(product.brand);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  // form validation function
  const validateForm = () => {
    // function to validate numeric input with up to 2 decimal places
    const validateNumberInput = (value) => {
      const stringValue = String(value);
      const parts = stringValue.split('.');
      if (parts.length > 2 || (parts[1] && parts[1].length > 2)) {
        return false;
      }
      return true;
    }

    // validate numeric inputs
    if (!validateNumberInput(pricebeforeDiscount) || !validateNumberInput(buyingPrice) || !validateNumberInput(quantity) 
    || !validateNumberInput(quantityLimit) || !validateNumberInput(discount)) {
      setError('Please enter valid values with up to 2 decimal places');
      setLoading(false);
      return;
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
  };

  // calculate price after discount 
  useEffect(() => {
    if (pricebeforeDiscount && discount) {
        const discountedPrice = parseFloat(pricebeforeDiscount) - (parseFloat(pricebeforeDiscount) * parseFloat(discount) / 100);
        setPriceAfterDiscount(discountedPrice.toFixed(2));
    }
  }, [pricebeforeDiscount, discount]);

  //recalculate priceAfterDiscount when pricebeforeDiscount change
  useEffect(() => {
    if (pricebeforeDiscount && discount) {
      const discountedPrice = parseFloat(pricebeforeDiscount) - (parseFloat(pricebeforeDiscount) * parseFloat(discount) / 100);
      setPriceAfterDiscount(discountedPrice.toFixed(2));
    }
  }, [pricebeforeDiscount]);

  const handleInventoryEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {return;}

    // construct form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('price', priceAfterDiscount);
    formData.append('pricebeforeDiscount', pricebeforeDiscount); 
    formData.append('quantity', quantity);
    formData.append('quantityLimit', quantityLimit);
    formData.append('buyingPrice', buyingPrice);
    formData.append('discount', discount);
    formData.append('description', description);
    formData.append('displayItem', displayItem);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        window.alert('Product Detail successfully updated :-)');
        setLoading(false);
        window.location.reload();
      } else {
        window.alert('Product Detail not updated :-(');
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editProduct">
      <form className="editItem-form" onSubmit={handleInventoryEdit}>
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
              onChange={(e) => setPricebeforeDiscount(e.target.value)}
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
              label="Quantity Limit"
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
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={displayItem} onChange={(e) => setDisplayItem(e.target.checked)} />}
              label="Display Item on Homepage"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </Grid>
        </Grid>

        <br />

        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EditInventoryItems;
