import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import './ProfileDetails.css';
import noPhoto from '../../images/noPhoto.png'

const ProfileDetails = (props) => {
    const { profile, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />
    
    if (profile) {
        return(
            <div className='businessProfile' >
                <h5 className='businessProfileName'>{profile.businessName}</h5>
                <div className='row'>
                    <div className='col-md-4 col-xs-12'>
                    {console.log(profile.imageURL)}
                    {profile.imageURL ?
                        <img className='businessProfileImage' src={profile.imageURL} alt={profile.businessName} />
                        :
                        <img className='businessProfileImage' src={noPhoto} alt={profile.businessName} />
                    }                      
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
                                    Types of Consulting We Perform:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                {profile.typeOfConsulting ?
                                    <p className='businessProfileSummaryConsultingTypes'>{profile.typeOfConsulting.join(', ')}</p>
                                    :
                                    <p className='businessProfileSummaryConsultingTypes'>No Consulting Types Chosen</p>
                                }
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
                                <a href={`http://${profile.website}`} target="_blank" rel="noopener noreferrer">{profile.website}</a>
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
                                <a href={`http://${profile.facebook}`} target="_blank" rel="noopener noreferrer">{profile.facebook}</a>
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
                                <a href={`http://${profile.twitter}`} target="_blank" rel="noopener noreferrer">{profile.twitter}</a>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    Our Instagram Handle:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <a href={`http://${profile.instagram}`} target="_blank" rel="noopener noreferrer">{profile.instagram}</a>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-md-4 col-xs-12'>
                                <h5 className='businessProfileLabel'>
                                    Our LinkedIn Account:
                                </h5>
                            </div>
                            <div className='col-md-8 col-xs-12'>
                                <a href={`${profile.linkedIn}`} target="_blank" rel="noopener noreferrer">{profile.linkedIn}</a>
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
