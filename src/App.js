import Login from './componenets/login';
import Register from './componenets/register';
import Product from './componenets/product';
import { useState } from 'react';
import { Redirect } from "react-router-dom";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './componenets/dashboard';
function App() {
  const [islogin, setIsLogin] = useState(localStorage.getItem('authentication') != null ? true : false);
  console.log("-----islogin---------", islogin);
  return (
    <div >
      <Router>
        <Route exact path='/' >
          <Login />
        </Route>
        <Route exact path='/register' >
          <Register />
        </Route>
        {islogin ?
          <Switch>

            <Route exact path='/dashboard' >
              <Dashboard />
            </Route>
            <Route exact path='/product' >
              <Product />
            </Route>


          </Switch> : (<Redirect to="/" />)}
      </Router>
    </div>
  );
}

export default App;
