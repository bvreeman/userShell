import React, { Component } from 'react'
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
      <div className='container'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="businessName">Business Name</label>
                <input type="text" id='businessName' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="businessDescription">Business Description</label>
                <input type="text" id='businessDescription' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="website">Website</label>
                <input type="text" id='website' required onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="facebook">Facebook Page</label>
                <input type="text" id='facebook' onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="twitter">Twitter Page</label>
                <input type="text" id='twitter' onChange={this.handleChange} />
            </div>
            <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
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
