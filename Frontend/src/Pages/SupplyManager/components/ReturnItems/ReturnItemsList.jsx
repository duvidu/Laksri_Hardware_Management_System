import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SearchBar from '../searchBar/searchBar';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Cancel } from '@mui/icons-material';
import {Select, MenuItem, Switch } from '@mui/material';
import AddReturnItemForm from './AddPurchaseOrderFormModal/AddReturnItemsForm';


function Row({ row, updateOrderStatus }) {
    const [open, setOpen] = useState(false);
    const [newStatus, setNewStatus] = useState(row.isRefunded);
    const [editable, setEditable] = useState(false);

    const handleToggleChange = () => {
        setNewStatus(!newStatus);
    };

    const handleEditClick = () => {
        setEditable(true);
    };

    const handleSaveClick = () => {
        setEditable(false);
        updateOrderStatus(row._id, newStatus);
    };

    const handleCancelClick = () => {
        setEditable(false)
    }
    const orderRowStyle = {
        backgroundColor: row.isRefunded === 'Received' ? '#c8e6c9' : row.isRefunded === 'Cancelled' ? '#ffcdd2' : '#fff',
    };
    

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={orderRowStyle}>
                <TableCell sx={{ padding: 0 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{ width: 50, height: 50 }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell  scope="row" sx={{ padding: 0 }}>
                    {row.product.name}
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{row.supplier.name}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{row.amount}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>
                {editable ? (
                    <Switch
                        checked={newStatus}
                        onChange={handleToggleChange}
                        inputProps={{ 'aria-label': 'toggle refund status' }}
                    />
                ) : (
                    newStatus ? (
                        <IconButton size="small" disabled>
                            <CheckCircleIcon style={{color:'green'}}/>
                        </IconButton>
                    ) : (
                        <IconButton size="small" disabled>
                            <CancelIcon style={{color:'red'}}/>
                        </IconButton>
                    )
                )}
            </TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{new Date(row.returnedDate).toLocaleDateString()}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{new Date(row.refundedDate).toLocaleDateString()}</TableCell>
                
                <TableCell align="right" sx={{ padding: '5px' }}>
                    {editable ? (
                        <React.Fragment>
                        <IconButton
                            aria-label="cancel edit"
                            size="small"
                            onClick={handleCancelClick}
                            sx={{ width: 50, height: 50 }}
                        >
                            <CancelIcon />
                        </IconButton>
                        <IconButton
                            aria-label="save edit"
                            size="small"
                            onClick={handleSaveClick}
                            sx={{ width: 50, height: 50 }}
                        >
                            <SaveIcon />
                        </IconButton>
                    </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <IconButton
                                aria-label="edit status"
                                size="small"
                                onClick={handleEditClick}
                                sx={{ width: 50, height: 50 }}
                            >
                                <EditIcon />
                            </IconButton>
                        </React.Fragment>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} sx={{ padding: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Returned Items
                            </Typography>
                            <Table size="small" aria-label="purchase-order-items">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Serial Number</TableCell>
                                        <TableCell align="right">Reason for Return </TableCell>
                                        <TableCell align="right">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items?.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell component="th" scope="row">
                                                {item?item.serialNumber:'N/A'}
                                            </TableCell>
                                            <TableCell align="right">{item.returnType}</TableCell>
                                            <TableCell align="right">{item.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

Row.propTypes = {
    row: PropTypes.shape({
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        supplier: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        amount: PropTypes.number.isRequired,
        isRefunded: PropTypes.bool,
        //returnedDate: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                item: PropTypes.shape({
                    serialNumber: PropTypes.string.isRequired,
                }),
                returnType: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};
//if(Row.propTypes) console.log(Row.propTypes.row.PropTypes.shape)
export default function ReturnItemsList() {
    const [returnItems, setReturnItems] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);


    const filteredItems = returnItems.filter(returnItem =>
        (returnItem.supplier?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
    };

    const handleAddReturnedItem = () => {
        setIsFormOpen(true);
    }

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    useEffect(() => {
        const fetchReturnItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/supply-management/returnItems');
                if (!response.ok) {
                    throw new Error('Failed to fetch purchase orders');
                }
                const data = await response.json();
                setReturnItems(data);

            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };

        fetchReturnItems();
    }, []);
    console.log("Data: ", returnItems)

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Define the table headers for the main table
        const mainHeaders = [['Order Number', 'Total Amount', 'Supplier', 'Status', 'Order Date', 'Received Date']];
    
        // Extract data from filteredItems array for the main table
        const mainData = [];
        filteredItems.forEach(order => {
            mainData.push([
                order.orderNumber,
                order.totalAmount,
                order.supplier.name,
                order.status,
                new Date(order.createdAt).toLocaleDateString(),
                new Date(order.receivedDate).toLocaleDateString()
            ]);
    
            // Check if the order has items
            if (order.items.length > 0) {
                // Define the table headers for the nested table (item details)
                const itemHeaders = [['Item', 'Quantity', 'Unit Price']];
                
                // Extract data from the order's items array
                const itemData = order.items.map(item => [
                    item.item.name,
                    item.quantity,
                    item.unitPrice
                ]);
    
                // Add the nested table (item details) to the main table data
                mainData.push([{ content: 'Item Details', colSpan: 6, styles: { fontStyle: 'bold', textColor: [255, 0, 0] } }]);
                mainData.push(itemHeaders[0]); // Add item headers
                mainData.push(...itemData);    // Add item data
            }
        });
    
        // Add the main table to the PDF
        doc.autoTable({
            head: mainHeaders,
            body: mainData,
        });
    
        // Save the PDF file
        doc.save('purchase_order_report.pdf');
    };
    

    const handleAddReturnItemsFormSubmit = async (formData) => {
        console.log(formData)
        try {
            const response = await fetch(
                "http://localhost:8000/supply-management/returnItems",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                const newreturnItem = await response.json()
                console.log("created data ", newreturnItem)
                setReturnItems([newreturnItem,...returnItems]);
            } else {
                console.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    const updateOrderStatus = async (itemId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/supply-management/returnItems/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isRefunded: newStatus })
            });

            if (response.ok) {
                const updatedItem = await response.json();
                // Update the order in your state or UI as needed
                console.log('return item updated:', updatedItem);

                setReturnItems(prevItems =>
                    prevItems.map(item =>
                        item._id === itemId ? { ...item, isRefunded: newStatus } : item
                    )
                );

            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };


    return (

        <Paper sx={{ width: '98%', overflow: 'hidden', marginTop: 5 }}>
            <div style={{ justifyContent: "end", display: 'flex' }}>
                <SearchBar style={{ height: 50 }} onSearch={handleSearch} placeholder="Search by supplier or status..." />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Button
                    sx={{
                        color: "primary.main",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },

                        width: 180,
                        height: 50
                    }}
                    startIcon={<AddIcon />}
                    onClick={handleAddReturnedItem}
                >
                    Add Return Items
                </Button>
                
            </div>

            <TableContainer sx={{ maxHeight: 380 , display:'flex', justifyContent:'center'}}>
                <Table aria-label="collapsible table" sx={{ width: '100%'}} stickyHeader >
                    <TableHead>
                        <TableRow sx={{ borderBottom: 0 }}>
                            <TableCell sx={{ width: '5%' }} />
                            <TableCell  >Product Name</TableCell>
                            <TableCell align="right" >Supplier</TableCell>
                            <TableCell align="right" >Refund Amount</TableCell>
                            <TableCell align="right" >Refund Status</TableCell>
                            <TableCell align="right" >Returned Date</TableCell>
                            <TableCell align="right" >Refunded Date</TableCell>
                            <TableCell align="right" >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((filtereditem) => (
                            <Row key={filtereditem._id} row={filtereditem} updateOrderStatus={updateOrderStatus} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={returnItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <AddReturnItemForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleAddReturnItemsFormSubmit} />

        </Paper>
    );
}
