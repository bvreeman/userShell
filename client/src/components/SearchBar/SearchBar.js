import React, { Component } from 'react';
import './SearchBar.css'
import firebase from "firebase/app";
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
        console.log(selectedOption)
        this.setState({ selectedOption: selectedOption.value })
      }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.selectedOption, 'state in change')
        console.group(this.state, 'state in submit')
        // this.firebaseSearch();
        // console.log(this.state.query, 'query')
        document.getElementById("findAConsultantQuery").reset();

    }
    
    firebaseSearch() {
        const rootRef = firebase.database().ref("users/");
        let item = this.state.query.toString()
        console.log(item, 'item')
        const queryRef = rootRef.orderByChild("typeOfConsulting").equalTo(item);
        console.log(queryRef, 'queryRef')

        queryRef.once("value", snap => {
            let queriedItem = []
            snap.forEach(child => {
                console.log('queriedItem', child.val());
                // queriedItem.push(child.val())
            });
            this.setState({
                query: queriedItem
            })
        })
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
                        Update
                    </button>
                </div>
            </form>
        )
    }
}

export default SearchBar;