import React, { useState } from 'react';
import Socialicons from './socialicons';
import "../styles/register.css";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UpdatedComponent from './updatedcomponent';
import swal from 'sweetalert';

function Register(props) {
    const [name, Setname] = useState('');
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');
    const [nameErr, SetNameErr] = useState(false);
    const [emailErr, SetEmailErr] = useState(false);
    const [pwdErr, SetPwdErr] = useState(false);
    const [pwdLengthErr, SetPwdLengthErr] = useState(false)
    const [emailFormatErr, SetEmailFormatErr] = useState(false);
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const { logo, BannerImg } = props;
    const history = useHistory();



    const handleOnchange = (e) => {
        console.log(e.target.name, e.target.value);
        switch (e.target.name) {
            case 'name':
                Setname(e.target.value);
                SetNameErr(false);
                break;
            case 'email':
                Setemail(e.target.value);
                SetEmailErr(false);
                email.match(regex) ? SetEmailFormatErr(false) : SetEmailFormatErr(true)
                break;
            case 'password':
                Setpassword(e.target.value);
                SetPwdErr(false);
                if ((password.length <= 7)) {
                    SetPwdLengthErr(true)
                }
                if (password.length > 7) {
                    if (specialChars.test(password)) {
                        SetPwdLengthErr(false);
                    }
                    else {
                        SetPwdLengthErr(true);

                    }
                }


                break;
            default:
                break;
        }

    }
    const handleRegister = () => {
        const newData = {
            name,
            email,
            password
        }

        if (!name) {
            SetNameErr(true);
        }
        if (!email) {
            SetEmailErr(true);
            SetEmailFormatErr(false);
        }

        if (!password) {
            SetPwdErr(true);
            SetPwdLengthErr(false)
        }
        if (password) {
            if (!specialChars.test(password)) {
                SetPwdLengthErr(true)
            }
        }
        if (name && email && password && email.match(regex) && (password.length > 7 && specialChars.test(password))) {
            console.log("-------------------", emailErr, pwdLengthErr);
            if (!(nameErr && emailErr && pwdErr && pwdLengthErr && emailFormatErr)) {
                console.log(name, email, password);
                const newData = {
                    name,
                    email,
                    password
                }
                const usersList = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList')) : [];
                console.log("usersList-----------------------", usersList);
                var newUser = true;
                usersList.map((user) => {
                    if (user.email == newData.email) {
                        newUser = false;
                        console.log("-----------ALREADY A USER--------------");

                        swal("Oops", "Already a User... use  Login ", "error")
                    }
                })
                if (newUser) {
                    usersList.push(newData);


                    localStorage.setItem('usersList', JSON.stringify(usersList));
                    localStorage.setItem('New_user', JSON.stringify(newData));

                    async function d() {
                        await localStorage.setItem('authentication', true);
                        await localStorage.setItem('currentuseremail', newData.email);
                    };
                    d();
                    history.push('/dashboard');


                }
                else {
                    Setname('');
                    Setemail('');
                    Setpassword('');
                }




            }
        }
        else {
            swal('Invalid', "Check User Detials Once", "warning")
        }




    }
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div className='register-area'>
                            <h3 style={{ textAlign: "center" }}>WELCOME TO</h3>
                            <div className='logo-area'>
                                <img src={logo} />
                            </div>
                            <p style={{ textAlign: "center" }}>login to get in the moments that update on the things</p>
                            <p style={{ textAlign: "center" }}>that intrest you</p>

                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control register-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" name='name' onChange={handleOnchange} value={name} />
                                    {nameErr ? <span style={{ color: "red", paddingLeft: "80px" }}>Enter your name</span> : ''}
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control register-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' onChange={handleOnchange} value={email} />
                                    {emailErr ? <span style={{ color: "red", paddingLeft: "80px" }}>Enter your email</span> : ''}
                                    {emailFormatErr ? <span style={{ color: "red", paddingLeft: "80px" }}>Enter valid email</span> : ''}
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control register-input" id="exampleInputPassword1" placeholder="Password" name='password' onChange={handleOnchange} value={password} />
                                    {pwdErr ? <span style={{ color: "red", paddingLeft: "80px" }}>Enter your password</span> : ''}
                                    {pwdLengthErr ? <span style={{ color: "red", paddingLeft: "80px" }}>Enter must be 8 char with special character</span> : ''}

                                </div>

                                <button type="button" class="btn btn-danger register-btn" onClick={handleRegister}>Register</button>
                            </form>
                            <div>
                                <p style={{ textAlign: "center", marginTop: "10px" }}>Already have an account  <Link to="/"><span style={{ color: "red" }}> Login  Now</span></Link></p>

                            </div>
                            <div className='divider'>
                                <span className='or'>or</span>
                            </div>
                            <p style={{ textAlign: "center" }}>continue with social media</p>

                            <div className='social-icons'>
                                <Socialicons />

                            </div>

                        </div>

                    </div>
                    <div class="col-sm">
                        <div className='banner-area'>
                            <img src={BannerImg} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default UpdatedComponent(Register)