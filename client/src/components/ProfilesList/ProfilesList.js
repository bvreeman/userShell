import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';

const ProfilesList = ({profiles}) => {
    return (
        <div className="project-list section">
            { profiles && profiles.map(profile => {
                return (
                    <Link to={'/project/' + profile.id} key={profile.id}>
                        <ProfileSummary profile={profile} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfilesList