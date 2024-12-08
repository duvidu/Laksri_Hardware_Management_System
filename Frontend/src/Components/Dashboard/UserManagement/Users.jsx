import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/Users')
    .then(result => setUsers(result.data))
    .catch(err=> console.log(err))

  } ,[])


return (
    <div className="d-flex  bg justify-content-center align-items-center">
      <div className="w-90 bg-white rounded p-10">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                {/* <td>{user._id}</td> */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
               
                <td>

                    <Link to={`/update/${user._id}`} className='btn btn-success '>Update</Link>
                    <button className='btn btn-danger' 
                    onClick={(e) => handleDelete(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}  

export default Users;