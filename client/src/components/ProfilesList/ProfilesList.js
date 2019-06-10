import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';

const ProfilesList = ({users, auth}) => {
    // console.log(users, 'profile')
    // console.log(auth, 'auth in profile')
    let shuffleArray = async (array) => {
        console.log(array, 'array in shuffleArray')
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

      shuffleArray(users)
      
      // Used like so
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