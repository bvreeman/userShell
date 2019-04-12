import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {updateProfile, updatePhoto} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
// import ls from 'local-storage';
import Select from 'react-select';
// import CreatableSelect from 'react-select/lib/Creatable';




import firebase from "firebase/app";
import 'firebase/storage';

import FileUploader from "react-firebase-file-uploader";

const consultingOptions = [
    { value: 'Organizational Change Management', label: 'Organizational Change Management' },
    { value: 'Leadership Development', label: 'Leadership Development' },
    { value: 'Culture Change', label: 'Culture Change' },
    { value: 'Business Analysis', label: 'Business Analysis' },
    { value: 'Financial Advisory', label: 'Financial Advisory' },
    { value: 'Risk and Compliance', label: 'Risk and Compliance' },
    { value: 'Management', label: 'Management' },
    { value: 'Strategy', label: 'Strategy' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'IT', label: 'IT' },
    { value: 'Environment', label: 'Environment' },
    { value: 'Change Management', label: 'Change Management' }
  ];

class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            twitter: '',
            facebook: '',
            businessName: '',
            businessDescription: '',
            website: '',
            typeOfConsulting: null,
            generatedName: '',
            isUploading: false,
            progress: 0,
            imageURL: '',
            isEditing: true
        }
    };

    static getDerivedStateFromProps(props, state) {
        if ((props.profile.firstName !== state.firstName) && ( state.firstName === undefined ||  state.firstName === "")   ) {
            return {
            firstName: props.profile.firstName,
            lastName: props.profile.lastName,
            twitter: props.profile.twitter,
            facebook: props.profile.facebook,
            businessName: props.profile.businessName,
            businessDescription: props.profile.businessDescription,
            website: props.profile.website,
            typeOfConsulting: props.profile.typeOfConsulting,
            imageURL: props.profile.imagURL,
          };
        }
        return null;
      }

    handleUploadStart = () => {
        console.log('started upload')
        this.setState({ isUploading: true, progress: 0 })
    }
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        console.log('success')
        this.setState({ generatedName: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("users")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                this.setState({ 
                    imageURL: url,
                    generatedName: filename,
                })
                console.log(this.state, 'state inside of upload')
                this.props.updatePhoto(this.state)
                document.getElementById("pictureForm").reset();
            })
    };  

    handleChange = (e) => {
        console.log(e.target, 'e.target in handle change')
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleMultiSelectChange = (typeOfConsulting) => {
        console.log(`Option selected:`, typeOfConsulting);
        this.setState({ typeOfConsulting });
        console.log(this.state, 'state after multiselectchange')
      }

      toggleEditing = () => {
        this.setState((prevState, props) => ({
            isEditing: !prevState.isEditing
          }));
    }

    onSubmit = (e) => {
        console.log(this.props, 'props onSubmit')
        console.log(this.state, 'state onSubmit')
        e.preventDefault();
        this.props.updateProfile(this.state)
        document.getElementById("profileForm").reset();
        // this.props.history.push('/ProfileForm')
        this.toggleEditing()
    }

      render() {
        const { profile, auth } = this.props;
        // const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className='row'>
                <div className=' profile-image-container'>               
                    <img className='profileFormImage' src={profile.imageURL} alt={profile.businessName} />
                    { this.state.isEditing ? 
                    <div className="profile-static-container">
                        <h1> {this.state.firstName}  {this.state.lastName} </h1>
                        <p> Business Name: {this.state.businessName}</p>
                        <p> Business Description: {this.state.businessDescription}</p>
                        <p> Website: {this.state.website}</p>
                        <p> Twitter: {this.state.twitter}</p>
                        <p> Facebook: {this.state.facebook} </p>
                        {/* <p> Type Of Consulting: {this.state.typeOfConsulting}</p> */}
                    </div>
                        :
                    <div className='col-md-6 col-xs-12'>
                        <form id='pictureForm' >
                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                            <FileUploader
                                accept="users/*"
                                name="generatedName"
                                randomizeFilename
                                // onSubmit={this.validateForm()}
                                storageRef={firebase.storage().ref("users")}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                // onPushtoDatabase={this.handlePushToDatabase}
                            />
                        </form>
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
                            <div className='input-field'>
                                <label htmlFor="typeOfConsulting">Type of Consulting</label>
                            </div>
                            {/* <CreatableSelect */}
                            < Select
                                id='typeOfConsulting'
                                value={this.state.typeOfConsulting}
                                onChange={this.handleMultiSelectChange}
                                options={consultingOptions}
                                isMulti='true'
                                isSearchable='true'
                            />
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
                            <div className="input-field">
                                <button className='profileFormSubmit'>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                    }
                    <button className={this.state.isEditing ? "btn btn-edit " :"btn btn-edit btn-edit-active"}  onClick={() => this.toggleEditing()} > Edit </button>
                    <div className='col-md-12 col-xs-12 profileFormButtonsContainer'>
                        <NavLink to='/' className='btn   btn-edit ProfileFormPageButton'>Home</NavLink>
                    </div>
                </div>
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
        updateProfile: (users) => dispatch(updateProfile(users)),
        updatePhoto: (users) => dispatch(updatePhoto(users))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'users'}]))(
ProfileForm)
