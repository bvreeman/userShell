import React from 'react'
// import moment from 'moment'
import './ProfileSummary.css'
import noPhoto from '../../images/noPhoto.png'

const ProfileSummary = ({profile}) => {
    // console.log('profile inside of profileSummary', profile)
    return (
        <div className='profileCard'>
            <h5 className='profileSummaryBusinessName'>{profile.businessName}</h5>
            {profile.imageURL ?
                <img className='businessProfileSummaryImage' src={profile.imageURL} alt={profile.businessName} />
                :
                <img className='businessProfileSummaryImage' src={noPhoto} alt={profile.businessName} />
            }   
            <p className='businessProfileSummaryDescription'>{profile.businessDescription}</p>
        </div>
    )
}

export default ProfileSummary