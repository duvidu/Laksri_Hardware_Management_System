import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarCode from './Inventory-Barcode';
import formatNumber from 'format-number';
import './InventoryStyles.css'
import EditForm from './EditInventoryItems';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const SelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Define options for formatting
  const options = { round: 2, padRight: 2, padLeft: 0, thousand: ',', decimal: '.' };

  //handleDelete function
  const handleDelete = async () => {
    // Confirm message
    const userConfirmedDelete = window.confirm("Are you sure to delete this item?");

    if (userConfirmedDelete) {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        navigate('/inventory');
      } else {
        const json = await response.json();
        console.error("Error deleting product:", json.error);
      }
    }
  }

  //Dialog functions
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  //handle barcode Print function
  const handlePrint = () => {
    const printContents = document.querySelector('.barcode-section').innerHTML;
    const originalContents = document.body.innerHTML;

    // get the number of barcode copies from the user
    const input = parseInt(prompt("Enter the number of copies:", "1"));

    // check if the user canceled or entered a non-numeric value
    if (input === null || isNaN(parseInt(input))) {
      return; 
    }

    const numberOfCopies = parseInt(input);

    // generate multiple copies 
    let allPrintContents = "";
    for (let i = 0; i < numberOfCopies; i++) {
      allPrintContents += printContents;
    }

    // replace the body content 
    document.body.innerHTML = allPrintContents;
    window.print();
    
    // restore the original body content
    document.body.innerHTML = originalContents;
  }

  useEffect(() => {
    const Url = `http://localhost:8000/inventory/${id}`;

    setLoading(true);

    // Fetch inventory details
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <div className="selectedProduct">
        {loading && <p>Loading...</p>}
        {!loading && !product && <p>No product found</p>}
        {!loading && product && (
          <div className="detailsBox" >
            <h2>{product.name}</h2>
            <div className="sp-container1">
              <div className="sp-subContainer1"> 
                <img className="sp-imageView" src={`http://localhost:8000/images/`+ product.img_URL} alt="Product" />
                <p className="sp-description"><strong>Brand :</strong>{product.brand}<br/><br/><strong>Description :</strong> <br></br>{product.description}</p>
                <div className="sp-button">
                  <Button onClick={handleEditDialogOpen} variant="contained" color="primary">Edit</Button>
                  <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </div>
              </div>
              <div>
                <table className="sp-table">
                  <tbody>
                    <tr>
                      <th>Product Id:</th>
                      <td>{id}</td>
                    </tr>
                    <tr>
                      <th>Product Category:</th>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <th>Price Before Discount:</th>
                      <td>Rs.{product.pricebeforeDiscount && formatNumber(options)(parseFloat(product.pricebeforeDiscount))}</td>
                    </tr>
                    <tr>
                      <th>Discount :</th>
                      <td>{product.discount}%</td>
                    </tr>
                    <tr>
                      <th>Price After Discount:</th>
                      <td>Rs.{product.price && formatNumber(options)(parseFloat(product.price))}</td>
                    </tr>
                    <tr>
                      <th>Unit Buying Price:</th>
                      <td>Rs.{product.buyingPrice && formatNumber(options)(parseFloat(product.buyingPrice))}</td>
                    </tr>
                    <tr>
                      <th>Profit:</th>
                      <td>Rs.{product.price && product.buyingPrice && formatNumber(options)(parseFloat(product.price) - parseFloat(product.buyingPrice))}</td>
                    </tr>
                    <tr>
                      <th>Available Amount:</th>
                      <td>{product.quantity}</td>
                    </tr>
                    <tr>
                      <th>Quantity Limit:</th>
                      <td>{product.quantityLimit}</td>
                    </tr>
                    <tr>
                      <th>Total Value of Available Quantity:</th>
                      <td>Rs.{product.price && product.quantity && formatNumber(options)(parseFloat(product.price) * parseFloat(product.quantity))}</td>
                    </tr>
                    <tr>
                      <th>Display on home page:</th>
                      <td>{product.displayItem === true ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="barcode-section">
                  <BarCode id={id} />
                </div>
                <Button variant="contained" onClick={handlePrint}>Print this barcode</Button>
              </div>
            </div> 
          </div>
        )}


        {/* Edit Product Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="1000px">
          <DialogTitle><h2>Edit Product</h2></DialogTitle>
          <DialogContent>  
            {product && <EditForm product={product} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default SelectedItem;
