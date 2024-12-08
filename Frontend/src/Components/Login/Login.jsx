import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import loginCss from './login.module.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../ReduxTool/userSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/login', { email, password })
            .then(res => {
                console.log("login : " + res.data);
                if (res.data.Status === "Success") {
                    dispatch(setUser({
                        name: res.data.name,
                        userId: res.data.userId
                    }));

                    if (res.data.role === "admin") {
                        navigate('/Dashboard');
                    }else if (res.data.role === "supply-manager") {
                        navigate('/supply-management');
                    } else if(res.data.role === "inventory-manager"){
                        navigate('/inventory');
                    } else if(res.data.role === "employee-manager"){
                        navigate('/employee')
                    } else if(res.data.role === "employee"){
                        navigate('/employeereq')
                    } else {
                        navigate('/');
                    }
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={loginCss.body}>
            <div className={loginCss.wrapper}>
                <form onSubmit={handleSubmit}>

                    <h1>Login</h1>

                    <div className={loginCss.inputBox}>
                        <input type="text" placeholder="Username" id='email' required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={loginCss.inputBox}>
                        <input type="password" placeholder="Password" id='pass' required
                            onChange={(e) => setPass(e.target.value)} />
                    </div>

                    <button type="submit" className={loginCss.btn}>Login</button>

                    <div className={loginCss.registerLink}>
                        <p>Don't Have an Account <Link to="/register">Register</Link></p>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;
