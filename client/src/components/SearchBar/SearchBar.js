import React, { Component } from 'react';
import './SearchBar.css'
import consultingOptions from '../ProfileForm/ConsultingTypesList'
import Select from 'react-select';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import ProfileSummary from '../ProfileSummary'


let businesses;

export const ConsultantInfo = ({ users }) => {
    return(
        <div className="project-list section">
            <h2>Your Search Results:</h2>
            { users && users.map(profile => {
                return (
                    <div className='businessSearchProfiles'>
                        <Link to={'/businessProfile/' + profile.id} key={profile.id}>
                            <ProfileSummary profile={profile} />
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}
class SearchBar extends Component {
    constructor(props) {
        super(props);
            this.state = {
                isClearable: true,
                isSearchable: true,
                selectedOption: null,
                consultantQuery: [],
                queriedConsultants: [],
                matchingBusiness: [],
            }
    }

    toggleClearable = () =>
        this.setState(state => ({ isClearable: !state.isClearable }));
    toggleSearchable = () =>
        this.setState(state => ({ isSearchable: !state.isSearchable }));

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption })
      }

    
    UserSearch() {
        let item = this.state.selectedOption.value;
        this.props.users.forEach((userProfile) => {
            userProfile.typeOfConsulting.forEach((consultingType) => {
                if ( item === consultingType ) {
                    this.setState({
                        matchingBusiness: [],
                    })
                    this.state.matchingBusiness.push(userProfile)
                    // businesses = this.state.matchingBusinessName.join(', ')
                    businesses = < ConsultantInfo users={ this.state.matchingBusiness } />
                } else {
                    businesses = <h4>No Consultants of that Type at this time</h4>
                }
            })
            
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
        businesses = ''
        this.setState({
            matchingBusinessName: [],
        })
        if ( this.state.selectedOption !== null ) {
            this.UserSearch();
            // console.log(this.state.query, 'query')
        } else {
            alert("Please enter a value before hitting Search")
        }
        document.getElementById("findAConsultantQuery").reset();
    }

    render() {
        const {
            isClearable,
            isSearchable,
            selectedOption,
        } = this.state;
        return (
            <form id='findAConsultantQuery' onSubmit={this.onSubmit}>
                <div className='input-field'>
                    <label htmlFor="consultingQuery">Type of Consulting</label>
                </div>
                < Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={consultingOptions}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                />
                <div className="input-field">
                    <button className='querySubmit'>
                        Search
                    </button>
                </div>
                <div>{businesses}</div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return{
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users'}
    ])
)(SearchBar)