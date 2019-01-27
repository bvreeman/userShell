import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ProfileDetails = (props) => {
    const { profile, auth, users } = props;
    console.log(profile, 'profile')
    console.log('auth', auth)
    console.log('users', users)
    if (!auth.uid) return <Redirect to='/signin' />
    
    if (profile) {
        console.log(profile, 'profile detail')
        return(
            <div className='card' style={{width: "75%"}}>
                <div className='card-body'>
                    <h5 className='card-title'>{profile.businessName}</h5>
                    <p className='card-text'>{profile.businessDescription}</p>
                    <p className='card-text'>{profile.website}</p>
                    <p className='card-text'>{profile.facebook}</p>
                    <p className='card-text'>{profile.twitter}</p>
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
    console.log(state)
    console.log(ownProps.match.params, 'test')
    const id = ownProps.match.params.id
    const businessProfiles = state.firestore.data.businessProfiles
    const profile = businessProfiles ? businessProfiles[id] : null
    
    return{
        profile: profile,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'businessProfiles'}
    ])
)(ProfileDetails)
