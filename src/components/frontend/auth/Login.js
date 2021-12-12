import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import '../../../assets2/css/loginstyle.css';
import '../../../assets2/js/Main';
import Image from '../../../assets2/img/wave.png';
import Image2 from '../../../assets2/img/gift.svg';
import Image3 from '../../../assets2/img/tomgif2.gif';


function Login() {

    const history = useHistory();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }
       
            axios.post('api/login', data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_firstname', res.data.firstname);
                    swal("Success", res.data.message, "success");
                    if (res.data.role === 'admin') {
                        history.push('/admin/dashboard');
                    }
                    else {
                        history.push('/raffles');
                    }
                }
                else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                }
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        
    }

    return (
        <div>
            <img className="wave" src={Image} alt="" />
            <div className="logcontainer">
                <div className="imggift">
                    <img src={Image2} alt="" />
                </div>
                <div className="login-content">
                    <form action="" className="login-form" onSubmit={loginSubmit}>
                        <img src={Image3} alt="" />
                        <div className="input-div one">
                            <div className="i">
                                <i className="bx bx-mail-send"></i>
                            </div>
                            <div className="div">
                                <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="input"placeholder="Email" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="bx bx-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="input" placeholder="Password"/>
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btnstyle">Login</button>
                        <Link to="/register">Create Account</Link>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;
