import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ProductSelection({ onSelect }) {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from Inventory collection
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/inventory/');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductSelect = (event, newValue) => {
        setSelectedProducts(newValue);
       
    };

    const handleAddProduct = () => {
        if (selectedProducts) {
            onSelect(selectedProducts);
            setSelectedProducts([]);
        }
    };

    return (
        <div>
            <Autocomplete
                multiple
                options={products}
                disableCloseOnSelect
                getOptionLabel={(product) => product.name}
                renderOption={(props, product, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {product.name}
                    </li>
                  )}
                value={selectedProducts}
                onChange={handleProductSelect}
                renderInput={(params) => (
                    <TextField {...params} label="Select Product" variant="outlined" />
                )}
            />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
}

export default ProductSelection;
