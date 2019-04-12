import React from 'react'
// import moment from 'moment'
import './ProfileSummary.css'

const ProfileSummary = ({profile}) => {
    // console.log('profile inside of profileSummary', profile)
    return (
        <div className='profileCard' style={{width: "18rem"}}>
            <h5 className='profileSummaryBusinessName'>{profile.businessName}</h5>
            <img className='businessProfileSummaryImage' src={profile.imageURL} alt={profile.businessName} />
            <p className='businessProfileSummaryDescription'>{profile.businessDescription}</p>
        </div>
    )
}

export default ProfileSummary