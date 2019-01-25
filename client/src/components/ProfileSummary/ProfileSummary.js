import React from 'react'
// import moment from 'moment'

const ProfileSummary = ({profile}) => {
    console.log('profile inside of profileSummary', profile)
    return (
        <div className='card' style={{width: "18rem"}}>
            <div className='card-body'>
                <h5 className='card-title'>{profile.businessName}</h5>
                <p className='card-text'>{profile.businessDescription}</p>
            </div>
        </div>
    )
}

export default ProfileSummary