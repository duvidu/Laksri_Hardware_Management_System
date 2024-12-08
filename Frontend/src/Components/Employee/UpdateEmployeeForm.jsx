import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import employeeCss from './employee.module.css'






const UpdateEmployeeForm = () => {
    const { id } = useParams(); 
    const [employee, setEmployee] = useState(null);
   

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await fetch(`http://localhost:8000/employees/${id}`);
            const data = await response.json();
            setEmployee(data);
            
        };
        fetchEmployee();
    }, [id]);

    
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [jobPost, setJobPost] = useState('');
    const [dateofhire, setDateofhire] = useState('');
    const [employmenttype, setEmploymenttype] = useState('');
    const [basicsalary, setBasicsalary] = useState('');

    useEffect(() => {
        if (employee) {
            setFullname(employee.fullname);
            setAddress(employee.address);
            setEmail(employee.email);
            setJobPost(employee.jobPost);
            setDateofhire(employee.dateofhire);
            setEmploymenttype(employee.employmenttype);
            setBasicsalary(employee.basicsalary);
        }
    }, [employee]);

    // Handle form submission to update employee details
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send PATCH request to update employee details
        try {
            const response = await fetch(`http://localhost:8000/employees/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    address,
                    email,
                    jobPost,
                    dateofhire,
                    employmenttype,
                    basicsalary,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update employee details');
            }
            alert('Employee details updated successfully');
        } catch (error) {
            console.error('Error updating employee details:', error.message);
            alert('Error updating employee details');
        }
    };

    return (
        <div className={employeeCss.UpdateEmpFormbody}>
        <div className={employeeCss.UpdateEmpForm}>
            <h2>Update Employee Details</h2>
            {employee && (
                <form onSubmit={handleSubmit}>
                    <label>Employee ID:(EmXXX)</label>
                    <input type="text" value={employee.employeeid} disabled />

                    <label>Full Name:</label>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} disabled/>

                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled/>

                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Job Post:</label>
                    <input type="text" value={jobPost} onChange={(e) => setJobPost(e.target.value)} />

                    <label>Date of Hire:</label>
                    <input type="date" value={dateofhire} onChange={(e) => setDateofhire(e.target.value)} disabled/>

                    <label>Employment Type (permanent/temporary):</label>
                    <input type="text" value={employmenttype} onChange={(e) => setEmploymenttype(e.target.value)} />

                    <label>Basic Salary:</label>
                    <input type="number" value={basicsalary} onChange={(e) => setBasicsalary(e.target.value)} />

                    <button type="submit">Update</button>
                </form>
            )}
        </div>
         </div>
    );
}

export default UpdateEmployeeForm; 