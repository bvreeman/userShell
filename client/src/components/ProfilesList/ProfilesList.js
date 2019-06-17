import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './ProfilesList.css';


class ProfilesList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newArray: [],
            shuffledArray: [],
        }
    }

    componentDidMount = async () => {
         console.log(await this.props)
    }

// const ProfilesList = ({users, auth}) => {
    // console.log(users, 'profile')
    // console.log(auth, 'auth in profile')
    render() { 
        let shuffleArray = async (array) => {
            await array;
            console.log(array, 'array here?')
            this.setState({ newArray: array})
            console.log(this.state.newArray, 'just set state')
            let currentIndex = await array.length, temporaryValue, randomIndex;
          
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
          
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
          
              // And swap it with the current element.
              temporaryValue = this.state.newArray[currentIndex];
              this.state.newArray[currentIndex] = this.state.newArray[randomIndex];
              this.state.newArray[randomIndex] = temporaryValue;
            }
            return this.state.newArray;
          }
        shuffleArray(this.state.newArray).then(value => {
            console.log(value, 'value inside shuffle')
            this.setState({ shuffledArray: value })
            console.log(this.state.shuffledArray, 'newArray after setstate')
        })
        console.log(this.state.shuffledArray, 'newArray')
// const ProfilesList = ({users, auth}) => {
    // console.log(users, 'profile')
    // console.log(auth, 'auth in profile')
    // let shuffleArray = async (array) => {
    //     console.log(array, 'array in shuffleArray')
    //     let currentIndex = array.length, temporaryValue, randomIndex;
      
    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
      
    //       // Pick a remaining element...
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
      
    //       // And swap it with the current element.
    //       temporaryValue = array[currentIndex];
    //       array[currentIndex] = array[randomIndex];
    //       array[randomIndex] = temporaryValue;
    //     }
    //     return array;
    //   }
    //   const newArray = shuffleArray(users)
    //   console.log(newArray, 'newArray')
      
    return (
        <div className="project-list section">
            {console.log(this.state.newArray, 'users in return')}
            { this.state.shuffledArray && this.state.shuffledArray.map(profile => {
                return (
                    <Link to={'/businessProfile/' + profile.id} key={profile.id}>
                        <ProfileSummary profile={profile} />
                    </Link>
                )
            })}
        </div>
    )
}
}

export default ProfilesList