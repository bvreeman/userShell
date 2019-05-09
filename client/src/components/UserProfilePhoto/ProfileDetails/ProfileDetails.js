import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './ProfileDetails.css';


const ProfileDetails = (props) => {
    const { profile, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    if (profile) {
        return(
            <div className='businessProfile' >
                <h5 className='businessProfileName'>{profile.businessName}</h5>
                <div className='row'>
                    <div className='col-md-4 col-xs-12'>
                        <img className='businessProfileImage' src={profile.imageURL} alt={profile.businessName} />
                    </div>
                    <div className='col-md-7 col-xs-12 businessProfileInfoBox'>
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    What We Do:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <p className='businessProfileInfo'>{profile.businessDescription}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    Our Website:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                    <p className='businessProfileInfo'>{profile.website}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    Our Facebook Page:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <p className='businessProfileInfo'>{profile.facebook}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    Our Twitter Handle:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <p className='businessProfileInfo'>{profile.twitter}</p>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    } else {
        return (
            <div className='container center'>
                <p>Loading Page</p>
            </ div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const businessProfiles = state.firestore.data.users
    const profile = businessProfiles ? businessProfiles[id] : null
    
    return{
        profile: profile,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users'}
    ])
)(ProfileDetails)
