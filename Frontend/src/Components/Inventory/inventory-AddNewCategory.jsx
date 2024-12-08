import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState('');

  const handleAddCategory = async () => {
    try {
      const response = await fetch('http://localhost:8000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      setCategoryName('');
      setError('');
      alert('Category added successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(categories.filter(category => category._id !== categoryId));
      alert('Category deleted successfully');
    } catch (error) {
      setError(error.message);
    }
  };

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
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category-page-main'>
      <div className='newCategory-form'>
        <h2>Add New Category</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Add Category
          </Button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div className='existing-category-list'>
        <br/>
        <h2>Existing Categories</h2>
        <h6>If deleting a product category, make sure to change the product <br/>category of related products as well!</h6>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => handleDeleteCategory(category._id)}>
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

export default AddCategoryForm;
