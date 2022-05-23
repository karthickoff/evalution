import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "../styles/header.css";
export default function Header() {
    const history = useHistory();
    console.log("---window------", window.location.href === 'http://localhost:3000/product');
    const handleLogout = () => {
        console.log("-----handleLogout----++-----");
        localStorage.removeItem('authentication');
        localStorage.removeItem('currentuseremail');
        history.push('/');



    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                {/* <a class="navbar-brand" href="#">Navbar</a> */}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <li class={window.location.href === 'http://localhost:3000/dashboard' ? 'nav-item active' : 'nav-item'}>
                            <Link class="nav-link " to="/dashboard" >Dashboard</Link>

                        </li>


                        <li class={window.location.href === 'http://localhost:3000/product' ? 'nav-item active' : 'nav-item'}>
                            <Link class="nav-link" to="/product">Product</Link>
                        </li>



                    </div>
                    <Link className='nav-link logout' onClick={handleLogout}>Logout</Link>
                </div>
            </nav>
        </div>
    )
}
