import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';

const ProfilesList = ({businessProfiles}) => {
    return (
        <div className="project-list section">
            { businessProfiles && businessProfiles.map(profile => {
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