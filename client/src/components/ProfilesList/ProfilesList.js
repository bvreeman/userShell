import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';

const ProfilesList = ({users, auth}) => {
    console.log(users, 'profile')
    console.log(auth, 'auth in profile')

    return (
        <div className="project-list section">
            { users && users.map(profile => {
                return (
                    <Link to={'/businessProfile/' + profile.id} key={profile.id}>
                        <ProfileSummary profile={profile} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfilesList