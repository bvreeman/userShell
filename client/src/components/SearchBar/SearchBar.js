import React, { Component } from 'react';
import './SearchBar.css'
import consultingOptions from '../../pages/ProfileForm/ConsultingTypesList'
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
                    <div className='searchedBusinessProfiles' key={profile.id}>
                        <Link to={'/businessProfile/' + profile.id}>
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
        businesses = ''
        this.setState({ 
            selectedOption: selectedOption, 
            matchingBusiness: [],
        }, () => {
            this.UserSearch()
        })
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
                } else if ( businesses === undefined || businesses === '') {
                    businesses = 
                        <div className='noConsultantDiv'>
                            <h4 className='noConsultanth4'>No Consultants of that Type at this time</h4>
                        </div>
                }
            })
            
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        businesses = ''
        this.setState({
            matchingBusiness: [],
        })
        if ( this.state.selectedOption !== null ) {
            this.UserSearch();
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
                    <label className='searchLabel' htmlFor="consultingQuery"><h1>Search for a consulting type</h1></label>
                </div>
                <div className='searchBarContainer'>
                    < Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={consultingOptions}
                        isClearable={isClearable}
                        isSearchable={isSearchable}
                        id={'searchBar'}
                    />
                </div>
                {/* <div className="input-field">
                    <button className='querySubmit'>
                        Search
                    </button>
                </div> */}
                <div className='row searchedBusinessesContainer'>
                    <div className='searchedBusinesses'>{businesses}</div>
                </div>
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