import React, { Component } from 'react';
import './SearchBar.css'
import * as firebase from "firebase/app";
import * as admin from 'firebase-admin';
import 'firebase/database';
import consultingOptions from '../ProfileForm/ConsultingTypesList'
import Select from 'react-select';

class SearchBar extends Component {
    state = {
        isClearable: true,
        isSearchable: true,
        selectedOption: null,
        consultantQuery: [],
        queriedConsultants: [],
    }

    toggleClearable = () =>
        this.setState(state => ({ isClearable: !state.isClearable }));
    toggleSearchable = () =>
        this.setState(state => ({ isSearchable: !state.isSearchable }));

    handleChange = (selectedOption) => {
        this.setState({ selectedOption: selectedOption })
      }

    
    firebaseSearch() {
        let item = this.state.selectedOption.value;
        const db = 
    }

    onSubmit = (e) => {
        e.preventDefault();
        if ( this.state.selectedOption !== null ) {
            this.firebaseSearch();
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

export default SearchBar;