import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {updateProfile} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

// import FileUploader from "react-firebase-file-uploader";

class ProfileForm extends Component {
    constructor(props) {
        super(props)
        console.log(props, 'this is props in the super area')
        this.state = {
            firstName: props.profile.firstName,
            lastName: props.profile.lastName,
            twitter: props.profile.twitter,
            facebook: props.profile.facebook,
            businessName: props.profile.businessName,
            businessDescription: props.profile.businessDescription,
            website: props.profile.website,
            // imageName: '',
            // imageTitle: "",
            // generatedName: "",
            // isUploading: false,
            // progress: 0,
            // imageURL: ""
        }
    }
    
    // handleChangeImageTitle = event => {
    //     this.setState({ imageTitle: event.target.value });
    //     document.getElementById('titleInput').value=''
    // }

    // handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
    
    // handleProgress = progress => this.setState({ progress });
    
    // handleUploadError = error => {
    //     this.setState({ isUploading: false });
    //     console.error(error);
    // };

    // componentDidMount = () => {
    //     console.log()
    //     this.setState({
           
    //     })
    // }

    handleChange = (e) => {
        // console.log(e.target.value, 'e in handle change')
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.updateProfile(this.state)
        document.getElementById("profileForm").reset();
        // this.props.history.push('/ProfileForm')
    }

      render() {
        const { auth } = this.props;
        // const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div >
                <form id='profileForm' onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name </label>
                        <input 
                            type="text" 
                            id='firstName' 
                            value={this.state.firstName}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name </label>
                        <input 
                            type="text" 
                            id='lastName'
                            value={this.state.lastName}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="businessName">Business Name </label>
                        <input 
                            type="text" 
                            id='businessName'
                            value={this.state.businessName}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="businessDescription">Business Description </label>
                        <textarea 
                            type="text" 
                            id='businessDescription'
                            value={this.state.businessDescription} 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="website">Website </label>
                        <input 
                            type="text" 
                            id='website' 
                            value={this.state.website}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="facebook">Facebook </label>
                        <input 
                            type="text" 
                            id='facebook'
                            value={this.state.facebook}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="twitter">Twitter </label>
                        <input 
                            type="text" 
                            id='twitter' 
                            value={this.state.twitter}
                            onChange={this.handleChange} 
                        />
                    </div>
                    {/* <FileUploader
                        accept="image/*"
                        name="generatedName"
                        randomizeFilename
                        // onSubmit={this.validateForm()}
                        // storageRef={firebase.storage().ref("images")}
                        // onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        // onPushtoDatabase={this.handlePushToDatabase}
                    /> */}
                    <div className="input-field">
                        <button className='profileFormSubmit'>
                            Update
                        </button>
                    </div>
                </form>

            </div>
        )
      }

}

const mapStateToProps = (state, ownProps) => {
    // console.log(state, 'state')
    // const id = ownProps.match.params.id
    const profile = state.firebase.profile
    // console.log(profile)
    // const profile = businessProfiles ? businessProfiles[id] : null
    // .console.log(profile, 'profile in mapstatetoprops')
    return{
        profile: profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (users) => dispatch(updateProfile(users))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'users'}]))(
ProfileForm)
