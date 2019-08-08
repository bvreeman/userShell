import React, { Component } from 'react'
import './SignIn.css'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

  render() {
    const { authError, auth } = this.props
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className='container logInContainer'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="signInHeader">Sign In</h5>
            <div className="input-field">
                <label className='inputLabel' htmlFor="email">Email:</label>
                <input type="email" id='email' className='signInInputField' onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="password">Password:</label>
                <input type="password" id='password' className='signInInputField' onChange={this.handleChange} />
            </div>
            <div className="input-field signInButtonContainer">
                <button className="btn logInButton">Log In</button>
                <div className="red-text center">
                    { authError ? <p>{authError}</p> : null }
                </div>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
