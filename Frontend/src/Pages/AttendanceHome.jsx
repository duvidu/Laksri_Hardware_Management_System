import { useEffect , useState} from "react"

//components 
import AttendanceDetails from "../Components/Attendance/AttendanceDetails"

import AttendanceCss from '../Components/Attendance/Attendance.module.css'


const AttendanceHome = () => {
    const [attendances, setAttendances] = useState(null)
    useEffect(() =>  {
            const fetchAttendances = async () => {
            const response = await fetch('http://localhost:8000/attendance')
            const json = await response.json()

            if (response.ok){
                setAttendances(json)
            }
        }

        fetchAttendances()
    }, [])
    return (
        <div className={AttendanceCss.Atthome}>
        <h2 className={AttendanceCss.dailAtt}>Daily Attendance</h2>
           <div className={AttendanceCss.titles}>
                <ul>
                    <li className={AttendanceCss.attList}><strong>Employee id</strong></li>
                    <li className={AttendanceCss.attList}><strong>Status</strong></li>
                    <li className={AttendanceCss.attList}><strong>Time In</strong></li>
                    <li className={AttendanceCss.attList}><strong>Time Out</strong></li>
                    <li className={AttendanceCss.attList}><strong>Date</strong></li>
                   
                </ul>
                
            </div>
           <div className={AttendanceCss.attendances}>
            {attendances && attendances.map((attendance) => (
                   
                <AttendanceDetails key={attendance._id} attendance={attendance}/>
            ))}
             
           </div>
           

           
        </div>
    )
}

export default AttendanceHome