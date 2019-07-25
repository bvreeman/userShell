import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {updateProfile, updatePhoto} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
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
            instagram: '',
            businessName: '',
            linkedIn: '',
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
        // const userID = firebase.auth().currentUser

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

    static getDerivedStateFromProps(props, state) {
        if ((props.profile.firstName !== state.firstName)) {
            if (props.profile.imageURL === undefined) {
                // Object.keys(props.profile).forEach((item) => {
                //     console.log(item, 'item in Object.keys')
                //     console.log(props.profile[item], 'value in Object.keys')
                //     if (props.profile[item] === '') {
                //         console.log(item, 'this item is undefined')
                //         props.profile[item] = ' '
                //     }
                // })
                if (props.profile.website === undefined) {
                    props.profile.website = null
                } if (props.profile.twitter === undefined) {
                    props.profile.twitter = null
                } if (props.profile.instagram === undefined) {
                    props.profile.instagram = null
                } if (props.profile.facebook === undefined) {
                    props.profile.facebook = null
                } if (props.profile.linkedIn === undefined) {
                    props.profile.linkedIn = null
                } if (props.profile.typeOfConsulting === undefined) {
                    props.profile.typeOfConsulting = []
                }
                return {
                    firstName: props.profile.firstName,
                    lastName: props.profile.lastName,
                    twitter: props.profile.twitter,
                    facebook: props.profile.facebook,
                    instagram: props.profile.instagram,
                    businessName: props.profile.businessName,
                    businessDescription: props.profile.businessDescription,
                    website: props.profile.website,
                    linkedIn: props.profile.linkedIn,
                    // typeOfConsulting: props.profile.typeOfConsulting,
                    imageURL: null,
                    // interimTypeOfConsulting: state.interimTypeOfConsulting,
                    interimTypeOfConsulting: props.profile.typeOfConsulting,
                    chosenConsultingOption: props.profile.chosenConsultingOption,
                }
            } else {
                if (props.profile.website === undefined) {
                    props.profile.website = null
                } if (props.profile.twitter === undefined) {
                    props.profile.twitter = null
                } if (props.profile.instagram === undefined) {
                    props.profile.instagram = null
                } if (props.profile.facebook === undefined) {
                    props.profile.facebook = null
                } if (props.profile.linkedIn === undefined) {
                    props.profile.linkedIn = null
                } if (props.profile.typeOfConsulting === undefined) {
                    props.profile.typeOfConsulting = []
                }
                return {
                    firstName: props.profile.firstName,
                    lastName: props.profile.lastName,
                    twitter: props.profile.twitter,
                    facebook: props.profile.facebook,
                    instagram: props.profile.instagram,
                    businessName: props.profile.businessName,
                    businessDescription: props.profile.businessDescription,
                    website: props.profile.website,
                    linkedIn: props.profile.linkedIn,
                    // typeOfConsulting: props.profile.typeOfConsulting,
                    imageURL: props.profile.imageURL,
                    // interimTypeOfConsulting: state.interimTypeOfConsulting,
                    interimTypeOfConsulting: props.profile.typeOfConsulting,
                    chosenConsultingOption: props.profile.chosenConsultingOption,
                };
            }
        }

        return null; 
      }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state, 'state in submit')
        // if statement protects against a blank form submit.
        if (this.state.typeOfConsulting === undefined) {
            this.setState({
                typeOfConsulting: []
            })
        }
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
                console.log(consultingType, 'consultingType')
                // this.setState({ typeOfConsulting: consultingType.value})
                this.state.typeOfConsulting.push(consultingType.value);
                return consultingType;
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
            <div className='row accountInfo'>
                <div className='accountFormCard'>
                    <div className='row profileFormHeader'>
                        <div className='col-md-6 col-xs-12 profileFormImageContainer'>
                            {profile.imageURL ?
                                <img className='profileFormImage' src={profile.imageURL} alt={profile.businessName} />
                                :
                                <img className='profileFormImage' src={noPhoto} alt={profile.businessName} />
                            }  
                        </div>
                        { this.state.isEditing ?
                            <div className='col-md-6 col-xs-12 profileFormHeaderInfo'>
                                <h1 className='userNameNonEdit'> {this.state.firstName}  {this.state.lastName} </h1>
                                <p className='businessNameNonEdit'> Business Name: {this.state.businessName}</p>
                                <p className='businessDescNonEdit'> Business Description: {this.state.businessDescription}</p>
                            </div>
                            :
                            <div></div>
                        }
                    </div>                      
                    { this.state.isEditing ? 
                    <div className="profile-static-container">
                        {/* <h1 className='userNameEdit'> {this.state.firstName}  {this.state.lastName} </h1>
                        <p className='businessNameEdit'> Business Name: {this.state.businessName}</p>
                        <p className='businessDescEdit'> Business Description: {this.state.businessDescription}</p> */}
                        <div className='row'>
                            <div className='col-md-12 col-xs-12'>
                                {profile.typeOfConsulting ?
                                    <p> Type Of Consulting: {profile.typeOfConsulting.join(', ')}</p>
                                    :
                                    <p> Type of Consulting: None Chosen</p>
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-xs-12'>
                                <p> Website: <a href={`${this.state.website}`} target="_blank" rel="noopener noreferrer">{this.state.website}</a></p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-xs-12'>
                                <p> Facebook: <a href={`${this.state.facebook}`} target="_blank" rel="noopener noreferrer">{this.state.facebook}</a> </p>
                            </div>
                            <div className='col-md-6 col-xs-12'>
                                <p> LinkedIn: <a href={`${this.state.linkedIn}`} target="_blank" rel="noopener noreferrer">{this.state.linkedIn}</a> </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-xs-12'>
                                <p> Twitter: <a href={`${this.state.twitter}`} target="_blank" rel="noopener noreferrer">{this.state.twitter}</a></p>
                            </div>
                            <div className='col-md-6 col-xs-12'>
                                <p> Instagram: <a href={`${this.state.instagram}`} target="_blank" rel="noopener noreferrer">{this.state.instagram}</a> </p>
                            </div>
                        </div>
                        <div className='profileFormEditButton'>
                            <button className={this.state.isEditing ? "btn btn-edit " :"btn btn-edit btn-edit-active"}  onClick={() => this.toggleEditing()} > Edit </button>
                        </div>
                        {/* {console.log(this.state.typeOfConsulting, 'typeOfConsulting inside of return')} */}
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
                                <label htmlFor="website">Website (include http:// or https://)</label>
                                <input 
                                    type="url" 
                                    id='website' 
                                    pattern='https?://.*'
                                    value={this.state.website}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className='input-field'>
                                <label htmlFor="interimTypeOfConsulting">Type of Consulting </label>
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
                                <label htmlFor="linkedIn">LinkedIn (include http:// or https://)</label>
                                <input 
                                    type="url" 
                                    id='linkedIn'
                                    pattern='https?://.*'
                                    value={this.state.linkedIn}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="facebook">Facebook (include http:// or https://)</label>
                                <input 
                                    type="url" 
                                    id='facebook'
                                    pattern='https?://.*'
                                    value={this.state.facebook}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="twitter">Twitter (include http:// or https://)</label>
                                <input 
                                    type="url" 
                                    id='twitter' 
                                    pattern='https?://.*'
                                    value={this.state.twitter}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="instagram">Instagram (include http:// or https://)</label>
                                <input 
                                    type="url" 
                                    id='instagram' 
                                    pattern='https?://.*'
                                    value={this.state.instagram}
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
