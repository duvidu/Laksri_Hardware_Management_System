import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddBrandsForm = () => {
  const [brandName, setBrandName] = useState('');
  const [brand, setBrands] = useState([]); 
  const [error, setError] = useState('');

  const handleAddBrands = async () => {
    try {
      const response = await fetch('http://localhost:8000/brands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: brandName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add brand');
      }

      setBrandName('');
      setError('');
      alert('Brand added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteBrands = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:8000/brands/${brandId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }

      setBrands(brand.filter(brand => brand._id !== brandId));
      alert('Category deleted successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/brands');
        if (!response.ok) {
          throw new Error('Failed to fetch Brands');
        }
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching Brands:', error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category-page-main'>
      <div className='newCategory-form'>
        <h2>Add New Brand</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddBrands(); }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add Brand
          </Button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div className='existing-category-list'>
        <br/>
        <h2>Existing Brands</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {brand.map(brand => (
                <TableRow key={brand._id}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => handleDeleteBrands(brand._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
};

export default AddBrandsForm;
