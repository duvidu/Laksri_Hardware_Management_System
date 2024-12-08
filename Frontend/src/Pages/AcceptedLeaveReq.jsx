import React, { useEffect, useState } from 'react';
import leaveCss from '../Components/Leave/leave.module.css'


const AcceptedLeaveReq = () => {
  const [acceptedLeaves, setAcceptedLeaves] = useState([]);

  useEffect(() => {
    const fetchAcceptedLeaves = async () => {
      try {
        const response = await fetch('http://localhost:8000/accleaves');
        const data = await response.json();
        setAcceptedLeaves(data);
      } catch (error) {
        console.error('Error fetching accepted leaves:', error);
      }
    };

    fetchAcceptedLeaves(); // Fetch accepted leaves on component mount
  }, []);

  return (
    <div className={leaveCss.homee}>
    <h2 className={leaveCss.titleAcc}>Accepted Leave Requests</h2>
    {acceptedLeaves.length === 0 ? (
      <p>No accepted leave requests found.</p>
    ) : (
      <div className={leaveCss.acceptedLeaveRequests}>
        {acceptedLeaves.map((leave) => (
          <div key={leave._id} className={leaveCss.leaveCard}>
            <strong>Employee ID:</strong> {leave.employeeid} <br />
            <strong>Email:</strong> {leave.email} <br />
            <strong>Leave Type:</strong> {leave.leaveType} <br />
            <strong>Start Date:</strong> {leave.startDate} <br />
            <strong>End Date:</strong> {leave.endDate} <br />
            <strong>Reason:</strong> {leave.reason} <br />
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default AcceptedLeaveReq;