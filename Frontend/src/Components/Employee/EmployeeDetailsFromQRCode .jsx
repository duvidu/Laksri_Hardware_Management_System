import { useState } from 'react';
import { Table } from '@mui/material'; // Or any other table component library
import QrReader from 'react-qr-reader'; // A common QR code scanning library

const EmployeeDetailsFromQRCode = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Parse the scanned QR code data
        setScannedData(parsedData); // Store the parsed data
      } catch (e) {
        setError("Failed to parse QR code data.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Failed to scan QR code.");
  };

  return (
    <div>
      <h2>Scan QR Code for Employee Details</h2>

      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />

      {error && <p>{error}</p>}

      {scannedData ? (
        <Table>
          <tbody>
            <tr>
              <td>Employee ID</td>
              <td>{scannedData.employeeid}</td>
            </tr>
            <tr>
              <td>Full Name</td>
              <td>{scannedData.fullname}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{scannedData.address}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{scannedData.email}</td>
            </tr>
            <tr>
              <td>Job Post</td>
              <td>{scannedData.jobPost}</td>
            </tr>
            <tr>
              <td>Date of Hire</td>
              <td>{scannedData.dateofhire}</td>
            </tr>
            <tr>
              <td>Employment Type</td>
              <td>{scannedData.employmenttype}</td>
            </tr>
            <tr>
              <td>Basic Salary</td>
              <td>{scannedData.basicsalary}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p>No data scanned yet.</p>
      )}
    </div>
  );
};

export default EmployeeDetailsFromQRCode;