import React, { Component } from 'react';
import './App.css';
import './App.scss';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import PhoneVertification from './components/auth/PhoneVertification';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPass from './components/auth/ForgetPass';
import SendPassSuccess from './components/auth/SendPassSuccess';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

import { Provider } from 'react-redux';
import store from './store/store';

import PrivateRoute from './components/common/PrivateRoute';
import NotFound from './components/not-found/NotFound';

import DefaultLayout from './components/layout/DefaultLayout';


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/phoneVertification" component={PhoneVertification} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgetPass" component={ForgetPass} />
            <Route exact path="/sendPassSuccess" component={SendPassSuccess} />          
            <Switch>
              <PrivateRoute path="/" component={DefaultLayout} />
              <PrivateRoute path="/pro" component={DefaultLayout} />
              <PrivateRoute path="/product/add" component={DefaultLayout} />
              <PrivateRoute path="/product" component={DefaultLayout} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
