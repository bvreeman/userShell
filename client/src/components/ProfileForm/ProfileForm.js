import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase';
import {createProfile} from '../../store/actions/businessProfileActions'
import './ProfileForm.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import FileUploader from "react-firebase-file-uploader";

class ProfileForm extends Component {
    state = {
        twitter: '',
        facebook: '',
        businessName: '',
        businessDescription: '',
        website: '',
        // imageName: '',
        // imageTitle: "",
        // generatedName: "",
        // isUploading: false,
        // progress: 0,
        // imageURL: ""
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.createProfile(this.state)
        this.props.history.push('/')
    }

      render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        console.log('this?', )
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <label htmlFor="twitter">Twitter </label>
                        <input 
                            type="text" 
                            id='twitter' 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="website">Website </label>
                        <input 
                            type="text" 
                            id='website' 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="facebook">Facebook </label>
                        <input 
                            type="text" 
                            id='facebook' 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="businessName">Business Name </label>
                        <input 
                            type="text" 
                            id='businessName' 
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="businessDescription">Business Description </label>
                        <textarea 
                            type="text" 
                            id='businessDescription' 
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
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        )
      }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (businessProfile) => dispatch(createProfile(businessProfile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

