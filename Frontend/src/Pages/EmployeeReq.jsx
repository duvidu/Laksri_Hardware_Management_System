import { useEffect , useState} from "react"
import employeeCss from '../Components/Employee/employee.module.css'



const EmployeeReq = () => {

    return (
        <div className={employeeCss.empimg}>
        <div className={employeeCss.empBody}>
            <p className={employeeCss.empTitle}>Employee DashBoard</p>
            <button className={employeeCss.AddNewLeaves}><a href="/addNewLeave" className={employeeCss.addReq}>Send a leave Request</a></button>
            <button className={employeeCss.AddNewAttendances}><a href="/addAttendance" className={employeeCss.addAttend}>Send Attendance</a></button>
        </div>
        </div>
    )
}


export default EmployeeReq