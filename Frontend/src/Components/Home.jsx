import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
//const jwt = require('jsonwebtoken')


function Home (){

    const [name , setName] = useState('');

    //axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log("login : " + res.data)
                if(res.data.Status === "Success"){

                    setName(res.data.name)
                    //alert(res.data.name)

                }else{
                   
                }
            })
            .catch(err => console.log(err))
    } , [])

    return (


        <div>

        <h1> Home Welcome {name} </h1>

        <h1>Click to go Register</h1>
        <Link to ="/Signup" > Sign Up</Link>



        </div>
    )
}

export default Home;