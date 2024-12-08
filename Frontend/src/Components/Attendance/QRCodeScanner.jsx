// import { useNavigate } from 'react-router-dom';
// import {QrReader} from 'react-qr-reader';
// import React, { useState } from 'react';

// const QRCodeScanner = () => {
//   const [scanResult, setScanResult] = useState(null);
//   const navigate = useNavigate();

//   const handleScan = (data) => {
//     if (data) {
//       setScanResult(data);
//       navigate(`/addAttendance/${data}`); // Navigate to the attendance form with employee ID
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <h3>Scan QR Code to Send Attendance</h3>
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: '100%' }}
//       />
//       {scanResult && <p>Scanned: {scanResult}</p>}
//     </div>
//   );
// };

// export default QRCodeScanner;