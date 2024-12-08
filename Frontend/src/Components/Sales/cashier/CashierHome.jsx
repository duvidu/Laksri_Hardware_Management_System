import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from "axios";
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import styles from './cashier.module.css';

export default function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    item: '',
    unitPrice: '',
    quantity: '',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    date: '',
    time: '',
    item: '',
    unitPrice: '',
    quantity: '',
  });

  const handleUpdateSale = (sale) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: sale._id,
      date: sale.date,
      time: sale.time,
      item: sale.item,
      unitPrice: sale.unitPrice,
      quantity: sale.quantity,
    });
  };

  useEffect(() => {
    const fetchInventoryItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/inventory');
            const data = await response.json();
            setInventoryItems(data);
        } catch (error) {
            console.error('Error fetching inventory items:', error);
        }
    };

    fetchInventoryItems();
  }, []);

  const handleCreateSale = (field, value) => {
    if (field === 'item') {
      const selectedItem = inventoryItems.find(item => item.name === value);
      if (selectedItem) {
        setFormData(prevData => ({
          ...prevData,
          [field]: value,
          unitPrice: selectedItem.price 
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [field]: value,
          unitPrice: '' 
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [field]: value
      }));
    }
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleDialogClose = () => {
    setOpenAddDialog(false);
    setOpenUpdateDialog(false);
    setFormData({
      date: '',
      time: '',
      item: '',
      unitPrice: '',
      quantity: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(`http://localhost:8000/sale/`, formData);
      if (result) {
        toast.success('Sale created successfully!');
      }
      getSales();
      setOpenAddDialog(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await axios.put(`http://localhost:8000/sale/${updateFormData._id}`, updateFormData);
      if (result) {
        getSales();
        toast.success('Sale updated successfully!');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8000/sale/${id}`);
      if (result) {
        getSales();
        toast.warning('Sale deleted successfully!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getSales = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/sale/`);
      setSales(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Sales not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred while getting sales data!');
      }
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <div className={styles.body}>
        <h2 className={styles.text2xlCenter}>Current Sales</h2>

        <div className={styles.bgGray100}>
          <div className={styles.flexJustifyBetweenItemsCenter}>
            <div className={styles.flex}>
              <Button variant="contained" color="primary" className={styles.mr4} onClick={handleAddDialogOpen}>Add Sale</Button>
            </div>
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              className={styles.mlAuto}
              onChange={(e) => {
                const keyword = e.target.value.toLowerCase();
                const filteredSales = sales.filter(sale =>
                  sale.saleId.toLowerCase().includes(keyword) ||
                  sale.date.toLowerCase().includes(keyword) ||
                  sale.time.toLowerCase().includes(keyword) ||
                  sale.item.toLowerCase().includes(keyword) ||
                  sale.unitPrice.toString().toLowerCase().includes(keyword) ||
                  sale.quantity.toString().toLowerCase().includes(keyword) ||
                  sale.totalPrice.toString().toLowerCase().includes(keyword)
                );
                setSales(filteredSales);
              }}
            />
          </div>
          {!isLoading ? (
            <TableContainer component={Paper} className={styles.maxWScreenXl}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sale ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(sales) && sales.map(sale => (
                    <TableRow key={sale._id}>
                      <TableCell>{sale.saleId}</TableCell>
                      <TableCell>{`${new Date(sale.date).getFullYear()}-${String(new Date(sale.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(sale.date).getDate()).padStart(2, '0')}`}</TableCell>
                      <TableCell>{sale.time}</TableCell>
                      <TableCell>{sale.item}</TableCell>
                      <TableCell>{parseFloat(sale.unitPrice).toFixed(2)}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>{parseFloat(sale.totalPrice).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={styles.flex}>
                          <Button size='small' variant="outlined" color="primary" className={styles.mr1} onClick={() => handleUpdateSale(sale)}>Update</Button>
                          <Button size='small' variant="outlined" color="error" className={styles.mr2} startIcon={<Delete />} onClick={() => handleDeleteSale(sale._id)}>Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Loader />
          )}
          <Dialog open={openAddDialog} onClose={handleDialogClose}>
            <DialogTitle>Add New Sale</DialogTitle>
            <DialogContent>
              <form>
                <div>
                  <label>Date</label>
                  <TextField required type="date" margin="normal" name="date" value={formData.date}
                    onChange={(e) => handleCreateSale('date', e.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <label>Time</label>
                  <TextField
                    required
                    type="time"
                    margin="normal"
                    name="time"
                    value={formData.time}
                    onChange={(e) => handleCreateSale('time', e.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <label>Item Name</label>
                  <Autocomplete
                    value={formData.item}
                    onChange={(event, newValue) => {
                      handleCreateSale('item', newValue);
                    }}
                    inputValue={formData.item}
                    onInputChange={(event, newInputValue) => {
                      handleCreateSale('item', newInputValue);
                    }}
                    options={inventoryItems.map((item) => item.name)}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </div>
                <div>
                  <label>Unit Price</label>
                  <TextField
                    required
                    label="Unit Price"
                    type="number"
                    margin="normal"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={(e) => handleCreateSale('unitPrice', e.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <label>Quantity Buy</label>
                  <TextField
                    required
                    label="Quantity"
                    type="number"
                    margin="normal"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleCreateSale('quantity', e.target.value)}
                    fullWidth
                  />
                </div>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit} color="primary">Submit</Button>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
            <DialogTitle>Update Sale</DialogTitle>
            <DialogContent>
              <form>
                {/* <TextField
                  required
                  label="Item"
                  margin="normal"
                  name="item"
                  value={updateFormData.item}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, item: e.target.value })}
                  fullWidth
                /> */}
                <Autocomplete
                  value={updateFormData.item}
                  onChange={(event, newValue) => {
                    const selectedItem = inventoryItems.find(item => item.name === newValue);
                    if (selectedItem) {
                      setUpdateFormData(prevData => ({
                        ...prevData,
                        item: newValue,
                        unitPrice: selectedItem.price
                      }));
                    } else {
                      setUpdateFormData(prevData => ({
                        ...prevData,
                        item: newValue,
                        unitPrice: ''
                      }));
                    }
                  }}
                  inputValue={updateFormData.item}
                  onInputChange={(event, newInputValue) => {
                    setUpdateFormData(prevData => ({
                      ...prevData,
                      item: newInputValue
                    }));
                  }}
                  options={inventoryItems.map((item) => item.name)}
                  renderInput={(params) => <TextField {...params} required />}
                />
                <TextField
                  required
                  label="Unit Price"
                  type="number"
                  margin="normal"
                  name="unitPrice"
                  value={updateFormData.unitPrice}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, unitPrice: e.target.value })}
                  fullWidth
                />
                <TextField
                  required
                  label="Quantity"
                  type="number"
                  margin="normal"
                  name="quantity"
                  value={updateFormData.quantity}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, quantity: e.target.value })}
                  fullWidth
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdate} color="primary">Submit</Button>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
