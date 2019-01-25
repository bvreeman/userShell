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
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
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
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;