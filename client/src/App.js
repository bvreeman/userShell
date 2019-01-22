import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderNav from './components/HeaderNav'
// import { connect } from 'react-redux';
// import { userAction } from './store/actions/userAction'

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

class App extends Component {
  render() {

    let userAction = (event) => {
      this.props.userAction();
      console.log('this.state', this.state)
     }

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


// const mapStateToProps = state => ({
//   ...state
//  })

//  const mapDispatchToProps = dispatch => ({
//   userAction: () => dispatch(userAction())
//  })

// class App extends Component {
//   render() {

//     let userAction = (event) => {
//       this.props.userAction();
//       console.log('this.state', this.state)
//      }

//     return (
//       <Router>
//         <div className="App">
//           <button onClick={userAction}>Test redux action</button>
//           <pre>
//             {
//               JSON.stringify(this.props)
//             }
//           </pre>
//           <HeaderNav />
//           <Switch>
//               <Route exact path='/' component={Home}/>
//               <Route path='/About' component={About}/>
//               <Route path='/ContactUsPage' component={ContactUsPage}/>
//               <Route path='/FindAConsultant' component={FindAConsultant} />
//               <Route path='/UserPage' component={UserPage} />

//               {/* Do not keep -- just for creating the page */}
//               {/* <Route path='*' component={ArtistBio}/> */}
//               {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> */}
//               <Route exact path={routes.SIGN_UP} component={() => <FirebaseSignUp />} />
//               <Route exact path={routes.SIGN_IN} component={() => <FirebaseSignIn />} />
//               <Route exact path={routes.PASSWORD_FORGET} component={() => <FirebasePasswordForgetPage />} />
//               {/* <Route exact path={routes.HOME} component={() => <HomePage />} /> */}
//               <Route exact path={routes.ACCOUNT} component={() => <FirebaseAccount />} />
//             </Switch>
//         </div>
//       </Router>
//     );
//   }
// }

// export default FirebaseWithAuthentication(connect(mapStateToProps, mapDispatchToProps) (App));
