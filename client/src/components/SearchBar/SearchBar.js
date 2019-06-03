import React, { Component } from 'react';
import './SearchBar.css'
import consultingOptions from '../ProfileForm/ConsultingTypesList'
import Select from 'react-select';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'


let businesses;

class SearchBar extends Component {
    constructor(props) {
        super(props);
            this.state = {
                isClearable: true,
                isSearchable: true,
                selectedOption: null,
                consultantQuery: [],
                queriedConsultants: [],
                matchingBusinessName: [],
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
                    console.log(userProfile.businessName)
                    this.state.matchingBusinessName.push(userProfile.businessName)
                    businesses = this.state.matchingBusinessName.join(', ')
                }
            })
            
        })

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            matchingBusinessName: [],
        })
        businesses = ''
        if ( this.state.selectedOption !== null ) {
            this.UserSearch();
            // console.log(this.state.query, 'query')
            document.getElementById("findAConsultantQuery").reset();
        } else {
            alert("Please enter a value before hitting Search")
        }
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

                <p>{businesses}</p>

                {/* <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p> */}
                <div className="input-field">
                    <button className='querySubmit'>
                        Search
                    </button>
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