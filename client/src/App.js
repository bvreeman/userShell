import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderNav from './components/HeaderNav'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import ContactUsPage from './pages/ContactUsPage'
import FindAConsultant from './pages/FindAConsultant'
import UserPage from './pages/UserPage';

import FirebaseSignUp from './components/Firebase/FirebaseSignUp';
import FirebaseSignIn from './components/Firebase/FirebaseSignIn';
import FirebasePasswordForgetPage from './components/Firebase/FirebasePasswordForget';
import FirebaseAccount from './components/Firebase/FirebaseAccount';
// import FirebaseWithAuthentication from './components/Firebase/FirebaseWithAuthentication';

import * as routes from './constants/routes';
import ProfileForm from './components/ProfileForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderNav />
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/About' component={About}/>
              <Route path='/ContactUsPage' component={ContactUsPage}/>
              <Route path='/FindAConsultant' component={FindAConsultant} />
              <Route path='/UserPage' component={UserPage} />
              <Route path='/ProfileForm' component={ProfileForm} />
              <Route exact path={routes.SIGN_UP} component={() => <FirebaseSignUp />} />
              <Route exact path={routes.SIGN_IN} component={() => <FirebaseSignIn />} />
              <Route exact path={routes.PASSWORD_FORGET} component={() => <FirebasePasswordForgetPage />} />
              <Route exact path={routes.ACCOUNT} component={() => <FirebaseAccount />} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;