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
            <h4 className='summaryTitle'>Who we are:</h4>
            <p className='businessProfileSummaryDescription'>{profile.businessDescription}</p>
            <h4 className='summaryTitle'>Type Of Consulting:</h4>
            {profile.typeOfConsulting ?
                <p className='businessProfileSummaryConsultingTypes'>{profile.typeOfConsulting.join(', ')}</p>
                :
                <p className='businessProfileSummaryConsultingTypes'>No Consulting Types Chosen</p>
            }
        </div>
    )
}

export default ProfileSummary