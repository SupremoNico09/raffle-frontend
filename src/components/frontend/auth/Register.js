import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Image from '../../../assets2/img/wave.png';
import Image2 from '../../../assets2/img/signup.svg';




function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role_as: '0',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstname: registerInput.firstname,
            lastname: registerInput.lastname,
            email: registerInput.email,
            password: registerInput.password,
            role_as: registerInput.role_as,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token' , res.data.token);
                    localStorage.setItem('auth_name' , res.data.username);
                    localStorage.setItem('auth_firstname' , res.data.firstname);
                    swal("Success",res.data.message,"success");
                    history.push('/login');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
                }

            });
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
                    <form action="" className="login-form" onSubmit={registerSubmit}>
                        <h2 className="title">Sign Up</h2>
                        <div className="row">
                            <div className="col">
                                <div className="input-div one">
                                    <div className="i">
                                        <i className="bx bx-user-circle"></i>
                                    </div>
                                    <div className="div">
                                        <input type="Firstname" name="firstname" onChange={handleInput} value={registerInput.firstname} className="input" placeholder="Firstname" />
                                    </div>
                                </div>
                                <span className="text-danger">{registerInput.error_list.firstname}</span>
                            </div>
                            <div className="col">
                                <div className="input-div one">
                                    <div className="i">
                                        <i className="bx bx-user-circle"></i>
                                    </div>
                                    <div className="div">
                                        <input type="lastname" name="lastname" onChange={handleInput} value={registerInput.lastname} className="input" placeholder="Lastname" />
                                        
                                    </div>
                                </div>
                                <span className="text-danger">{registerInput.error_list.lastname}</span>
                            </div>
                        </div>
                        <div className="input-div one">
                            <div className="i">
                                <i className='bx bx-envelope'></i>
                            </div>
                            <div className="div">
                                <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="input" placeholder="Email" />
                            </div>
                        </div>
                        <span className="text-danger">{registerInput.error_list.email}</span>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="bx bx-lock"></i>
                            </div>
                            <div className="div">
                                <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="input" placeholder="Password" />
                            </div>
                        </div>
                        <span className="text-danger">{registerInput.error_list.password}</span>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="bx bx-lock"></i>
                            </div>
                            <div className="div">
                                <input type="confirm" className="input" placeholder="Confirm Password" />
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="btn btnstyle">Signup</button>
                        <Link to="/login">I am already a member</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register
