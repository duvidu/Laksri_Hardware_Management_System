import React, { useEffect, useState } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./subcomponents/header";
import Footer from "./subcomponents/footer";
import { useNavigate } from 'react-router-dom';

export default function Report() {
    const [reportData, setReportData] = useState({
        totalDrivers: 0,
        availableDrivers: 0,
        carDrivers: 0,
        bikeDrivers: 0,
        lorryDrivers: 0
    });

    useEffect(() => {
        axios.get('/reportData')
            .then(response => {
                setReportData(response.data);
            })
            .catch(error => console.error('There was an error fetching the report data:', error));
    }, []);

    const createPdf = () => {
        const doc = new jsPDF();
        doc.text('Drivers Report', 20, 20);
        doc.autoTable({
            startY: 30,
            head: [['#', 'Description', 'Value']],
            body: [
                ['1', 'Number of Drivers registered', reportData.totalDrivers],
                ['2', 'Number of available drivers now', reportData.availableDrivers],
                ['3', 'Number of car drivers registered', reportData.carDrivers],
                ['4', 'Number of bike drivers registered', reportData.bikeDrivers],
                ['5', 'Number of lorry drivers registered', reportData.lorryDrivers],
            ],
        });
        doc.save('report.pdf');
    };
    const navigate = useNavigate(); // Hook to get access to the navigate function

    // This function will be called when the button is clicked
    const handleClick = () => {
        navigate('/driver-dispatcher'); // Navigate programmatically
    };
    return (
        <div>
            <Header />
          
            <h1 className="container">Report</h1>
            <table className="table table-striped table-hover container">
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Number of Drivers registered</td>
                        <td>{reportData.totalDrivers}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Number of available drivers now</td>
                        <td>{reportData.availableDrivers}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Number of Truk drivers registered</td>
                        <td>{reportData.carDrivers}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Number of bike drivers registered</td>
                        <td>{reportData.bikeDrivers}</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Number of lorry drivers registered</td>
                        <td>{reportData.lorryDrivers}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button type="button" className="btn btn-primary container" style={{ width: '200px', marginLeft: '100px' }} onClick={createPdf}>
                    Create PDF of Report
                </button>
                
                <button type="button" className="btn btn-primary"  onClick={handleClick} style={{ width: '200px', marginLeft: '30px' }}>
                View Drivers
                </button>
            </div>
            
            <Footer />
        </div>
        
    );
}
