import React from 'react'
import ProfileSummary from '../ProfileSummary'
import { Link } from 'react-router-dom'
import './FeaturedConsultantsList.css';

class FeaturedConsultantsList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newArray: [],
        }
    }

    componentDidUpdate = () => {
        if (this.props.users !== undefined) {
            this.setState({ newArray: this.props.users})
        }
    }

    shuffleArray = (array) => {
        if (array.length > 2) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -=1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
        }
    }
    render() { 
        this.shuffleArray(this.state.newArray) 
        // console.log(this.state.newArray.slice(0, 3), 'newArray in render')
        this.state.newArray.slice(0, 3)     
    return (
        <div className="featuredConsultantListContainer">
            { this.state.newArray.slice(0, 3) && this.state.newArray.slice(0, 3).map(profile => {
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

export default FeaturedConsultantsList