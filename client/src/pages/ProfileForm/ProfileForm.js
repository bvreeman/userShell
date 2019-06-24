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
import noPhoto from '../../images/noPhoto.png'
import consultingOptions from './ConsultingTypesList'

import firebase from "firebase/app";
import 'firebase/storage';

import FileUploader from "react-firebase-file-uploader";

  let consultingChoices;

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
            typeOfConsulting: [],
            generatedName: '',
            isUploading: false,
            progress: 0,
            imageURL: '',
            isEditing: true,
            interimTypeOfConsulting: [],
            chosenConsultingOption: [],
        }
    };


    static getDerivedStateFromProps(props, state) {
        if ((props.profile.firstName !== state.firstName)) {
            // console.log(props.profile.typeOfConsulting)
            return {
                firstName: props.profile.firstName,
                lastName: props.profile.lastName,
                twitter: props.profile.twitter,
                facebook: props.profile.facebook,
                businessName: props.profile.businessName,
                businessDescription: props.profile.businessDescription,
                website: props.profile.website,
                // typeOfConsulting: props.profile.typeOfConsulting,
                imageURL: props.profile.imagURL,
                // interimTypeOfConsulting: state.interimTypeOfConsulting,
                interimTypeOfConsulting: props.profile.typeOfConsulting,
                chosenConsultingOption: props.profile.chosenConsultingOption,
            };
        }
        return null; 
      }

    // Start of the photo uploader

    // This Function handles the counter for uploading progress
    handleUploadStart = () => {
        console.log('started upload')
        this.setState({ isUploading: true, progress: 0 })
    }
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    // If there's a successful upload this function fires.
    handleUploadSuccess = filename => {
        console.log('success')
        this.setState({ generatedName: filename, progress: 100, isUploading: false });
        console.log(this.props.auth.uid, 'logging props to see if I have access to auth')
        const userID = firebase.auth().currentUser

        // Sends the image to firebase storage
        firebase
            .storage()
            // .ref(`users/${userID}`)
            .ref("users")
            // .child(userID)
            .child(filename)
            .getDownloadURL()
            // Sets the Image URL into state along with the filename so it can be sent through the redux store to Firestore
            .then(url => {
                this.setState({ 
                    imageURL: url,
                    generatedName: filename,
                })
                // Sends the state above through the redux store to Firestore
                this.props.updatePhoto(this.state)
                document.getElementById("pictureForm").reset();
            })
    };  

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidUpdate = (individualItem) => {
        if ( consultingChoices !== undefined ) {
            consultingChoices = this.state.typeOfConsulting.map((consulting) =>  consulting.value)
        }
        
    }

    handleMultiSelectChange = (interimTypeOfConsulting) => {
        // Doubling up states of same item because I need it to be in a specific form in order for the Multi
        // Select form to read it properly. I also wanted it in a standard array to better display the items
        // on the un-editable screen
        this.setState({ 
            interimTypeOfConsulting: interimTypeOfConsulting,
            chosenConsultingOption: interimTypeOfConsulting,
         });
      }

      toggleEditing = () => {
        this.setState((prevState, props) => ({
            isEditing: !prevState.isEditing
          }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        // if statement protects against a blank form submit.
        if (this.state.chosenConsultingOption !== undefined) {
            this.setState({
                // emptying typeOfConsulting because I use a push for the newly selected items. If I don't
                // it just adds to the items.
                typeOfConsulting: [],
                // 
                chosenConsultingOption: this.state.chosenConsultingOption
            })
            // using this to pull the items out of the one array in order to make it easier to display
            // on the non-editable screen.
            Object.values(this.state.interimTypeOfConsulting).map((consultingType) => {
                this.state.typeOfConsulting.push(consultingType.value);
                return consultingType.value
            })
        }
        // sending state to the redux store for Firestore
        this.props.updateProfile(this.state)
        document.getElementById("profileForm").reset();
        this.toggleEditing()
    }

      render() {
        const { profile, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className='row'>
                <div className=' profile-image-container'>  
                    {profile.imageURL ?

                        <img className='profileFormImage' src={profile.imageURL} alt={profile.businessName} />
                        :
                        <img className='profileFormImage' src={noPhoto} alt={profile.businessName} />
                    }                        
                    { this.state.isEditing ? 
                    <div className="profile-static-container">
                        <h1> {this.state.firstName}  {this.state.lastName} </h1>
                        <p> Business Name: {this.state.businessName}</p>
                        <p> Business Description: {this.state.businessDescription}</p>
                        <p> Website: <a href={`http://${this.state.website}`} target="_blank" rel="noopener noreferrer">{this.state.website}</a></p>
                        <p> Twitter: <a href={`http://${this.state.twitter}`} target="_blank" rel="noopener noreferrer">{this.state.twitter}</a></p>
                        <p> Facebook: <a href={`http://${this.state.facebook}`} target="_blank" rel="noopener noreferrer">{this.state.facebook}</a> </p>
                        {/* {console.log(this.state.typeOfConsulting, 'typeOfConsulting inside of return')} */}
                        {profile.typeOfConsulting ?
                            <p> Type Of Consulting: {profile.typeOfConsulting.join(', ')}</p>
                            :
                            <p> Type of Consulting: None Chosen</p>
                        }
                        <button className={this.state.isEditing ? "btn btn-edit " :"btn btn-edit btn-edit-active"}  onClick={() => this.toggleEditing()} > Edit </button>
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
                                <label htmlFor="interimTypeOfConsulting">Type of Consulting</label>
                            </div>
                            {/* <CreatableSelect could work here, but it sends an underscore
                            which doesn't work sending through DocumentTreference.update()
                            for firebase. Document fields cannot begin and end with _*/}     
                            < Select
                                id='interimTypeOfConsulting'
                                defaultValue={this.state.chosenConsultingOption}
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
                        <button className={this.state.isEditing ? "btn btn-edit " :"btn btn-edit btn-edit-active"}  onClick={() => this.toggleEditing()} > Cancel </button>
                    </div>
                    }
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
