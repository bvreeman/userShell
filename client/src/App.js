import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderNav from './components/HeaderNav'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import ContactUsPage from './pages/ContactUsPage'
import FindAConsultant from './pages/FindAConsultant'

import firebase from 'firebase/app';
import 'firebase/database';
import admin from 'firebase-admin';

import FirebaseSignUp from './components/Firebase/FirebaseSignUp';
import FirebaseSignIn from './components/Firebase/FirebaseSignIn';
import FirebasePasswordForgetPage from './components/Firebase/FirebasePasswordForget';
import FirebaseAccount from './components/Firebase/FirebaseAccount';
import FirebaseWithAuthentication from './components/Firebase/FirebaseWithAuthentication';

import * as routes from './constants/routes';



class App extends Component {
  render() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectID: process.env.REACT_APP_PROJECT_ID,
        clientEmail: process.env.REACT_APP_CLIENT_EMAIL,
        privateKey: process.env.REACT_APP_PRIVATE_KEY
      }),
      databaseURL: process.env.REACT_APP_URL
    });
    
    const config = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
    };
  
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    return (
      <Router>
        <div className="App">
          <HeaderNav />
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/About' component={About}/>
              <Route path='/ContactUsPage' component={ContactUsPage}/>
              <Route path='/FindAConsultant' component={FindAConsultant} />
              {/* Do not keep -- just for creating the page */}
              {/* <Route path='*' component={ArtistBio}/> */}
              {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> */}
              <Route exact path={routes.SIGN_UP} component={() => <FirebaseSignUp />} />
              <Route exact path={routes.SIGN_IN} component={() => <FirebaseSignIn />} />
              <Route exact path={routes.PASSWORD_FORGET} component={() => <FirebasePasswordForgetPage />} />
              {/* <Route exact path={routes.HOME} component={() => <HomePage />} /> */}
              <Route exact path={routes.ACCOUNT} component={() => <FirebaseAccount />} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default FirebaseWithAuthentication(App);
