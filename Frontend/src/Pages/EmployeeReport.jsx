import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import employeeCss from '../Components/Employee/employee.module.css'
import { useReactToPrint } from "react-to-print";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";
import { BorderColor } from "@mui/icons-material";

const EmployeeReport = () => {
  const { employeeid } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Fetch employee details
        const employeeResponse = await fetch(`http://localhost:8000/employees/${employeeid}`);
        if (employeeResponse.ok) {
          const employeeJson = await employeeResponse.json();

          // Fetch attendance data and filter by employee ID
          const attendanceResponse = await fetch(`http://localhost:8000/attendance/`);
          const attendanceJson = await attendanceResponse.json();
          const attendanceCount = attendanceJson.filter(
            (attendance) => attendance.employeeid === employeeid
          ).length;

          // Fetch leaves data for the same employee ID
          const accleaveResponse = await fetch(`http://localhost:8000/accleaves`);
          const accleaveJson = accleaveResponse.ok ? await accleaveResponse.json() : [];
          const accleaveCount = accleaveJson.filter(
            (leave) => leave.employeeid === employeeid
          ).length;

          // Adjust accleaveCount if it's greater than 5
          const adjustedAccleaveCount = accleaveCount > 2 ? accleaveCount - 2 : 0;

          // Calculate monthly salary based on filtered attendance
          const dailyWage = employeeJson.basicsalary / 30;
          const monthlySalary = ((dailyWage * attendanceCount)-(dailyWage * adjustedAccleaveCount)).toFixed(2);

          // Combine data
          const data = {
            employeeid: employeeJson.employeeid,
            attendanceCount,
            accleaveCount: adjustedAccleaveCount,
            basicSalary: employeeJson.basicsalary,
            monthlySalary,
          };


          setEmployeeData(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [employeeid]); // `employeeid` as a dependency

  const componentPDF = useRef();

  const generateReport = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'Employee Report',
    onAfterPrint: () => alert('Report downloaded successfully!'),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    <div style={{ textAlign: 'center', padding: '20px 60px', backgroundColor: '#f5f5f5' }}>
    <div
      ref={componentPDF}
      style={{
        width: '60%',
        padding: '20px',
        margin: '0 auto', // Centering the content
        backgroundColor: '#ffffff', // White background
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)', // Soft shadow for depth
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginBottom: '20px',
          color: '#333', // Dark text color for contrast
        }}
      >
        Employee Report
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Employee ID</TableCell>
            <TableCell>{employeeData.employeeid}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Attendance Count</TableCell>
            <TableCell>{employeeData.attendanceCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#555' }}>No-Pay Leave Count</TableCell>
            <TableCell>{employeeData.accleaveCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Basic Salary (LKR)</TableCell>
            <TableCell>{employeeData.basicSalary}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Monthly Salary (LKR)</TableCell>
            <TableCell>{employeeData.monthlySalary}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Button
      variant="contained"
      onClick={generateReport}
      style={{
        marginTop: '20px',
        backgroundColor: '#1976d2', // Blue color for the button
        color: '#ffffff', // White text on the button
        padding: '10px 20px', // Spacing around the text
        borderRadius: '4px', // Rounded corners for the button
      }}
    >
      Download
    </Button>
  </div>
  
  );
};

export default EmployeeReport;
