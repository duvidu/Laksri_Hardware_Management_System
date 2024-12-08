import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../userSlice';



function Dashboard (){

    const user= useSelector((state) => state.user.user)

    if(!user){
        return <h2>No user informations</h2>
    }

    const navigate = useNavigate();

    //variable for success msg
    const [suc ,setSuc] = useState();

    axios.defaults.withCredentials = true;



    //Protected routes
    useEffect(()=>{
        axios.get('http://localhost:3001/dashboard' )
            .then(res => {
                if(res.data === "Success"){

                    setSuc("Succeeded !" )
                    console.log(res.data)

                }else{
                     navigate('/')
                    //console.log(err)

                    setSuc("Not Succeeded !")
                }
            })
            .catch(err => console.log(err))
    } , [])  


    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res=> {
            if(res.data.Status){
                navigate('/login')
            }
        })
        dispatch(clearUser());
        navigate('/login'); // Redirect to the login page after logout
      };

    return (

        <div>
            <h1>Dashboard</h1>
            <>{suc}</>

            <h2>{user.name}</h2>
            <h2>{user.email}</h2>


            <button onClick={handleLogout} className="btn btn-primary">
                Logout
            </button>

        
        </div>

    );
}

export default Dashboard;