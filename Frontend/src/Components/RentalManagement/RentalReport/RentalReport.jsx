import React, { useState, useEffect } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

import {
  Table,
  CardActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function RentalReport() {
  document.title = "Rental Report";
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/rentalReport`);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching rental report data:", error);
    }
  };

  const calculateTotalTimesHired = (itemName) => {
    return reportData.filter((item) => item.itemName === itemName).length;
  };

  const calculateTotalTimePeriod = (itemName) => {
    return reportData
      .filter((item) => item.itemName === itemName)
      .reduce((total, item) => total + item.daysForLend, 0);
  };

  const calculateTotalRevenue = (itemName) => {
    return reportData
      .filter((item) => item.itemName === itemName)
      .reduce((total, item) => total + item.totalPay, 0);
  };

  const uniqueItemNames = [...new Set(reportData.map((item) => item.itemName))];

  const mostlyHiringItems = uniqueItemNames.filter(
    (itemName) => calculateTotalTimesHired(itemName) > 3
  );

  const leastHiringItems = uniqueItemNames.filter(
    (itemName) => calculateTotalTimesHired(itemName) < 3
  );

  // Calculate total income
  const totalIncome = reportData.reduce(
    (total, item) => total + item.totalPay,
    0
  );

  const printPage = () => {
    window.print();
  };

  const goItemList = () => {
    window.location.href = "/rentalService";
  };

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "underline",
          fontSize: "25px",
          marginTop: "10px",
          marginBottom: "20px",
          color: "#023047",
        }}
      >
        Rental Report
      </h1>
      <div
        align="center"
        style={{
          textDecoration: "underline",
          fontSize: "20px",
          color: "#415a77",
        }}
      >
        Rented Items Details
      </div>

      <TableContainer
        component={Paper}
        style={{ maxWidth: "90vw", margin: "auto" }}
      >
        <Table style={{ textAlign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Item Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                No of Times Hired
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Total Time Period (Days)
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Total Revenue
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueItemNames.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell>{itemName}</TableCell>
                <TableCell>{calculateTotalTimesHired(itemName)}</TableCell>
                <TableCell>{calculateTotalTimePeriod(itemName)}</TableCell>
                <TableCell>{calculateTotalRevenue(itemName)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        align="center"
        style={{
          textDecoration: "underline",
          fontSize: "20px",
          marginTop: "20px",
          color: "#415a77",
        }}
      >
        Mostly Hiring Items
      </div>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "90vw", margin: "auto" }}
      >
        <Table style={{ textAlign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                Item Name
              </TableCell>
              <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                No of Times Hired
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostlyHiringItems.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell colSpan={2}>{itemName}</TableCell>
                <TableCell colSpan={2}>
                  {calculateTotalTimesHired(itemName)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        align="center"
        style={{
          textDecoration: "underline",
          fontSize: "20px",
          marginTop: "20px",
          color: "#415a77",
        }}
      >
        Least Hiring Items
      </div>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "90vw", margin: "auto" }}
      >
        <Table style={{ textAlign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                Item Name
              </TableCell>
              <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
                No of Times Hired
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leastHiringItems.map((itemName, index) => (
              <TableRow key={index}>
                <TableCell colSpan={2}>{itemName}</TableCell>
                <TableCell colSpan={2}>
                  {calculateTotalTimesHired(itemName)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2
        style={{
          marginTop: "10px",
          fontSize: "30px",
          textAlign: "center",
          color: "#023047",
        }}
      >
        Total Income - Rs. {totalIncome}.00
      </h2>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={goItemList}
          style={{
            marginTop: "5px",
            backgroundColor: "#354f52",
            fontWeight: "bold",
          }}
          endIcon={<SendIcon />}
        >
          Go to Item List
        </Button>

        <Button
          variant="contained"
          onClick={printPage}
          style={{
            marginTop: "5px",
            backgroundColor: "#1a759f",
            fontWeight: "bold",
          }}
        >
          Print Report
        </Button>
      </CardActions>
    </div>
  );
}

export default RentalReport;
