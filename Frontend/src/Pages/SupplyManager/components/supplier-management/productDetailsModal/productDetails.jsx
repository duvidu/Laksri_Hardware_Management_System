import React from "react";
import Box from "@mui/material/Box";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function ProductDetailsModal({ isOpen, onClose, supplier }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 400,
          maxWidth: 600,
        }}
      >
        <h2 id="product-modal-title">Product Details</h2>
        {supplier && supplier.productsSupplied && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Product Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplier.productsSupplied.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {supplier && !supplier.productsSupplied && <div>Loading....</div>}
      </Box>
    </Modal>
  );
}

export default ProductDetailsModal;
