import { useState } from "react";
import employeeCss from './employee.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeForm = () => {
    const [employeeid, setEmployeeid] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [jobPost, setJobPost] = useState('');
    const [dateofhire, setDateofhire] = useState('');
    const [employmenttype, setEmploymenttype] = useState('');
    const [basicsalary, setBasicsalary] = useState('');
    const [error, setError] = useState(null);

    const notify = () => toast("Adding a new employee!");

    const handleEmployeeForm = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!employeeid || !fullname || !address || !email || !jobPost || !dateofhire || !employmenttype || !basicsalary) {
            setError("Please fill in all fields.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const employee = { employeeid, fullname, address, email, jobPost, dateofhire, employmenttype, basicsalary };

        const response = await fetch('http://localhost:8000/employees', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setEmployeeid('');
            setFullname('');
            setAddress('');
            setEmail('');
            setJobPost('');
            setDateofhire('');
            setEmploymenttype('');
            setBasicsalary('');
            setError(null);
            console.log('new employee added', json);
        }
    }

    return (
        <div className={employeeCss.AddImage}>
            <div className={employeeCss.AddEmpForm}>
                <form onSubmit={handleEmployeeForm}>
                    <h3>Add a New Employee</h3> 

                    <label>Employee ID:(EmXXX)</label>
                    <input type="text" onChange={(e) => setEmployeeid(e.target.value)} value={employeeid} />

                    <label>Full Name:</label>
                    <input type="text" onChange={(e) => setFullname(e.target.value)} value={fullname} />

                    <label>Address:</label>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />

                    <label>Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />

                    <label>Job Post:</label>
                    <input type="text" onChange={(e) => setJobPost(e.target.value)} value={jobPost} />

                    <label>Date of Hire:</label>
                    <input type="date" onChange={(e) => setDateofhire(e.target.value)} value={dateofhire} />

                    <label>Employment Type(permanent/temporary):</label>
                    <input type="text" onChange={(e) => setEmploymenttype(e.target.value)} value={employmenttype} />

                    <label>Basic Salary:</label>
                    <input type="number" onChange={(e) => setBasicsalary(e.target.value)} value={basicsalary} />

                    <button className={employeeCss.adBtn} onClick={notify}>Add Employee</button><ToastContainer />
                    {error && <div className={employeeCss.error}>{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;