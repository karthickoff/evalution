import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import "../styles/login.css";
import Socialicons from './socialicons';
import userImg from "../assets/username.png";
import lockImg from "../assets/lock.png";
import infoImg from "../assets/info.png";
import UpdatedComponent from './updatedcomponent';
function Login(props) {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const history = useHistory();

    var userFound = false;

    const { logo, BannerImg } = props;
    const usersList = JSON.parse(localStorage.getItem('usersList'))
    console.log("usersList in login ", usersList);
    const handleLogin = () => {
        if (email && password) {
            usersList.map((item) => {
                if (item.email == email) {
                    console.log("----------userr founf in---DB", item);
                    localStorage.setItem('currentUser', item);
                    if (password == item.password) {
                        userFound = true;
                        localStorage.setItem('authentication', true);
                        localStorage.setItem('currentuseremail', email);
                        history.push('/dashboard');

                    }
                    else {
                        userFound = true;

                        swal("oops", "Wrong password Try again", "error")
                        SetEmail('');
                        SetPassword('');
                    }
                }
            })
            if (!userFound) {
                swal("Err", "Not an Existing User Try Register", "warning");
                SetEmail('');
                SetPassword('');


            }

        }
        else {
            swal('Error', 'Enter valid detials')
        }


    }
    const handleOnchange = (e) => {
        if (e.target.name == "email") {
            SetEmail(e.target.value)
        }
        else {
            SetPassword(e.target.value)
        }
    }
    return (
        <div className='container'>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div className='left-area'>
                            <h3 style={{ textAlign: "center" }}>WELCOME TO</h3>
                            <div className='logo-area'>
                                <img src={logo} />
                            </div>
                            <p style={{ textAlign: "center" }}>login to get in the moments that update on the things</p>
                            <p style={{ textAlign: "center" }}>that intrest you</p>
                            <div>
                                <form>
                                    <div class="form-group">

                                        <input type="email" class="form-control logininput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={email} onChange={handleOnchange} />
                                        <div className='user'>
                                            <img src={userImg} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control logininput" id="exampleInputPassword1" placeholder="Password" name='password' value={password} onChange={handleOnchange} />
                                        <div className='lock'>
                                            <img src={lockImg} />
                                        </div>
                                        <div className='info-icon'>
                                            <img src={infoImg} />

                                        </div>
                                    </div>

                                    <button type="button" class="btn btn-danger loginbutton" onClick={handleLogin}>Signin</button>
                                </form>

                                <p style={{ textAlign: "center", marginTop: "10px" }}>Don't have an account ? <Link to="/register"><span style={{ color: "red" }}> Sign Up Now</span></Link></p>
                            </div>
                            <div>
                                <div className='divider'>
                                    <span className='or'>or</span>
                                </div>
                                <p style={{ textAlign: "center" }}>continue with social media</p>
                                <div>
                                    <div className='social-icons'>
                                        <Socialicons />

                                    </div>
                                </div>
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
export default UpdatedComponent(Login);
