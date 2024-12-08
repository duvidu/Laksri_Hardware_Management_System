
import React , {useState , useEffect} from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
// import bcrypt from 'bcryptjs';


function UpdateUsers (){

   

    const user = useSelector((state) => state.user.user);
    //const {id} = useParams()

    const [name , setName] = useState()
    const [email , setEmail] = useState()
    const [phone , setPhone] = useState()
    const [password, setPassword] = useState("");
   // const [age , setAge] = useState()
    const Navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+user.id)
        .then(result => {console.log(result)

            setName(result.data.name)
            setEmail(result.data.email)
            setPhone(result.data.phone)
            setPassword(result.data.password)
            //setAge(result.data.age)

        })
        .catch(err=> console.log(err))
    
      } ,[])

    
    

      const Update = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:3001/updateUser/'+user.id, {name,email,phone,password})
        .then(result => {
            console.log(result)
            Navigate('/')

        
        }) 
        .catch(err=> console.log(err))
      }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>    
                <h2>Update User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-2">
                    <label htmlFor="">pass</label>
                    <input
                    type="number"
                    placeholder="Enter Email"
                    className="form-control"

                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />

                </div>

                <div className="mb-2">
                    <label htmlFor="">pass</label>
                    <input
                    type="text"
                    placeholder="Enter Email"
                    className="form-control"
                    disabled

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                
                <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
    )
}

export default UpdateUsers;