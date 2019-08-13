import React, { Component } from 'react'
import './SignUp.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        businessName: '',
        website: '',
        businessDescription: '',
        facebook: '',
        twitter: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
    }

  render() {
    const { auth, authError } = this.props
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className='container signUpContainer'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="signUpHeader">Sign Up</h5>
            <div className="input-field">
                <label className='inputLabel' htmlFor="email">Email</label>
                <input type="email" id='email' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="password">Password</label>
                <input type="password" id='password' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="businessName">Business Name</label>
                <input type="text" id='businessName' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="businessDescription">Business Description</label>
                <input type="text" id='businessDescription' className='signUpInputField' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="website">Website</label>
                <input type="text" id='website' className='signUpInputField' onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="facebook">Facebook Page</label>
                <input type="text" id='facebook' className='signUpInputField' onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label className='inputLabel' htmlFor="twitter">Twitter Page</label>
                <input type="text" id='twitter' className='signUpInputField' onChange={this.handleChange} />
            </div>
            <div className="input-field signUpButtonContainer">
                <button className="signUpButton">Sign Up</button>
                <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null } 
                </div>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
