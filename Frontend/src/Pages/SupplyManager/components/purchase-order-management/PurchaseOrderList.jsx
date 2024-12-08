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
import AddOrderForm from './AddPurchaseOrderFormModal/AddPurchaseOrderForm';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function Row({ row, updateOrderStatus }) {
    const [open, setOpen] = useState(false);
    const [newStatus, setNewStatus] = useState(row.status);
    const [editable, setEditable] = useState(false);

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
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
        backgroundColor: row.status === 'Received' ? '#c8e6c9' : row.status === 'Cancelled' ? '#ffcdd2' : '#fff',
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
                    {row.orderNumber}
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{row.supplier.name}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{row.totalAmount}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>
                    {editable ? (
                        <React.Fragment>
                            <select value={newStatus} onChange={handleStatusChange}>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Received">Received</option>
                            </select>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {row.status}
                        </React.Fragment>
                    )}
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right" sx={{ padding: '5px' }}>{new Date(row.receivedDate).toLocaleDateString()}</TableCell>
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
                                Purchase Order Items
                            </Typography>
                            <Table size="small" aria-label="purchase-order-items">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Unit Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell component="th" scope="row">
                                                {item.item.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.unitPrice}</TableCell>
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
        orderNumber: PropTypes.string.isRequired,
        supplier: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        totalAmount: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                item: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
                quantity: PropTypes.number.isRequired,
                unitPrice: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};
//if(Row.propTypes) console.log(Row.propTypes.row.PropTypes.shape)
export default function PurchaseOrderList() {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);


    const filteredOrders = purchaseOrders.filter(purchaseOrder =>
        (purchaseOrder.supplier?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (purchaseOrder.status || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (purchaseOrder.orderNumber || '').toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleAddPurchaseOrder = () => {
        setIsFormOpen(true);
    }

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/supply-management/purchase-orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch purchase orders');
                }
                const data = await response.json();
                setPurchaseOrders(data);

            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };

        fetchPurchaseOrders();
    }, []);


    /* const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add summary section
        doc.text('Purchase Order Report', 10, 10);
        doc.text('Summary:', 10, 20);
        doc.text(`Total Orders: ${filteredOrders.length}`, 10, 30);
        // Add more summary metrics as needed
        
        // Add order details section
        doc.text('Order Details:', 10, 50);
    
        const ordersData = [];
        filteredOrders.forEach((purchaseOrder) => {
            const orderSummary = {
                'Order Number': purchaseOrder.orderNumber,
                'Total Amount': purchaseOrder.totalAmount,
                'Supplier': purchaseOrder.supplier.name,
                'Status': purchaseOrder.status,
                'Order Date': new Date(purchaseOrder.createdAt).toLocaleDateString(),
            };
    
            //const orderItems = purchaseOrder.items.map((item) => ({
             //   'Item': item.item.name,
              //  'Quantity': item.quantity,
             //   // Add more item details as needed
            //}));
    
            ordersData.push([orderSummary]);
        });
    
        let startY = 60;
        ordersData.forEach((orderData) => {
            doc.autoTable({
                startY: startY,
                body: orderData,
                theme: 'plain',
                styles: { overflow: 'linebreak' },
                columnStyles: { 0: { fontStyle: 'bold' } },
            });
            startY = doc.autoTable.previous.finalY + 10;
        });
    
        doc.save('purchase_order_report.pdf');
    }; */

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Define the table headers for the main table
        const mainHeaders = [['Order Number', 'Total Amount', 'Supplier', 'Status', 'Order Date', 'Received Date']];
    
        // Extract data from filteredOrders array for the main table
        const mainData = [];
        filteredOrders.forEach(order => {
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
    
      
      
    
    

    
    
    

    const handleAddOrderFormSubmit = async (formData) => {
        console.log(formData)
        try {
            const response = await fetch(
                "http://localhost:8000/supply-management/purchase-orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                const newOrder = await response.json()
                console.log("created data ", newOrder)
                setPurchaseOrders([newOrder,...purchaseOrders]);
            } else {
                console.error("Failed to add supplier");
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/supply-management/purchase-orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                // Update the order in your state or UI as needed
                console.log('Order status updated:', updatedOrder);

                setPurchaseOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );

            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
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
                    onClick={handleAddPurchaseOrder}
                >
                    Add Order
                </Button>
                <button onClick={generatePDF} style={{ width: 200, height: 50 }}>Generate PDF</button>
            </div>

            <TableContainer sx={{ maxHeight: 380 , display:'flex', justifyContent:'center'}}>
                <Table aria-label="collapsible table" sx={{ width: '100%'}} stickyHeader >
                    <TableHead>
                        <TableRow sx={{ borderBottom: 0 }}>
                            <TableCell sx={{ width: '5%' }} />
                            <TableCell  >Order Number</TableCell>
                            <TableCell align="right" >Supplier</TableCell>
                            <TableCell align="right" >Total Amount</TableCell>
                            <TableCell align="right" >Status</TableCell>
                            <TableCell align="right" >Order Date</TableCell>
                            <TableCell align="right" >Received Date</TableCell>
                            <TableCell align="right" >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((purchaseOrder) => (
                            <Row key={purchaseOrder._id} row={purchaseOrder} updateOrderStatus={updateOrderStatus} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={purchaseOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <AddOrderForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleAddOrderFormSubmit} />

        </Paper>
    );
}
