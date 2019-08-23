import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderNav from './components/HeaderNav'

// Pages
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import ProfileDetails from './components/ProfileDetails';
import About from './pages/About'
import ContactUsPage from './pages/ContactUsPage'
import FindAConsultant from './pages/FindAConsultant'
import ProfileForm from './pages/ProfileForm';
import ContactFormSubmit from './components/ContactFormSubmit';
// import SearchResults from './pages/SearchResults';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderNav />
          <Switch>
              <Route exact path='/' component={FindAConsultant}/>
              <Route path='/About' component={About}/>
              <Route path='/ContactUsPage' component={ContactUsPage}/>
              <Route path='/ProfileForm' component={ProfileForm} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/businessProfile/:id' component={ProfileDetails} />
              <Route path='/ContactFormSubmit' component={ContactFormSubmit} />
              {/* <Route path='/SearchResults' component = {SearchResults} /> */}
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;