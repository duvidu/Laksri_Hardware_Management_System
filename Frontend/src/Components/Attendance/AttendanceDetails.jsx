import AttendanceCss from './Attendance.module.css'


const AttendanceDetails = ({ attendance }) => {

   
    
    return(
        <div className={AttendanceCss.attendanceDetails}>
        <ul>
        <li>{attendance.employeeid }</li>
        <li>{attendance.status}</li>
        <li>{attendance.timeIn}</li>
        <li>{attendance.timeOut}</li>
        <li>{attendance.createdAt}</li>
        </ul>
        </div>
    )
}

export default AttendanceDetails 