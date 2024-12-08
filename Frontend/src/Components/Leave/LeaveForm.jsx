import  { useState } from "react"
import leaveCss from './leave.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveForm = () => {
    const [employeeid, setEmployeeid] = useState('')
    const [email, setEmail] = useState('')
    const [leaveType, setLeaveType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')
    const [error, setError] = useState(null)
   
    const notify = () => toast("Submiting a new leave Request!");


    const handleLeaveForm = async (e) => {

        e.preventDefault()

        const leave = {employeeid,email,leaveType,startDate,endDate,reason}

        const response = await fetch('http://localhost:8000/leaves', {
            method: 'POST',
            body: JSON.stringify(leave),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setEmployeeid('')
            setEmail('')
            setLeaveType('')
            setStartDate('')
            setEndDate('')
            setReason('')
            setError(null)
            console.log('new leave request sent', json)
        }
    }



    return (
        <div className={leaveCss.leaveImg}>
        <div className={leaveCss.LeaveFrm}>
        <form onSubmit={handleLeaveForm}>
            <h3>Add a New Leave Request</h3>

            <lable>Employee ID:(EmXXX)</lable>
            <input type="text" onChange={(e) => setEmployeeid(e.target.value)} value={employeeid}/>

            <lable>Email:</lable>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <lable>Leave Type:</lable>
            <input type="text" onChange={(e) => setLeaveType(e.target.value)} value={leaveType}/>

            <lable>Start Date:</lable>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate}/>

            <lable>End Date:</lable>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />

            <lable>Reason:</lable>
            <input type="text" onChange={(e) => setReason(e.target.value)} value={reason} />

            <button className={leaveCss.sendReq}  onClick={notify}>Send Request</button><ToastContainer />
            {error && <div className={leaveCss.error}>{error}</div>}
        </form>
        </div>
        </div>
    );
}

export default LeaveForm