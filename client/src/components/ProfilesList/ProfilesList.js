import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';

// class ProfilesList extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             data: null
//         }
//     }

//     componentWillMount() {
//         this.loadData();
//     }

//     loadData = (users) => {
//         console.log(this.props, 'users')
//             // for (let i = users.length - 1; i > 0; i--) {
//             //     const j = Math.floor(Math.random() * (i + 1));
//             //     [users[i], users[j]] = [users[j], users[i]];
//             // }
//             // return users;
//         }
    const ProfilesList = ({users, auth}) => {
    // console.log(users, 'profile')
    // console.log(auth, 'auth in profile')
    // render() {
    //     console.log(this.props, 'props in render')
    return (
        <div className="project-list section">
            { users && users.map(profile => {
                // console.log(Math.random(profile), 'profile')
                return (
                    <Link to={'/businessProfile/' + profile.id} key={profile.id}>
                        <ProfileSummary profile={profile} />
                    </Link>
                )
            })}
        </div>
    )
}
// }

export default ProfilesList