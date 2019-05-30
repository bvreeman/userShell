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
        this.setState({ selectedOption: selectedOption })
      }

    
    firebaseSearch() {
        const rootRef = firebase.database().ref.child('users/');
        console.log(rootRef, 'rootRef')
        let item = this.state.selectedOption.value;
        console.log(item, 'item')
        let queryRef = rootRef.orderByKey().on('child_added', function(snapshot) {
            console.log(snapshot.key());
        });

        // let queryRef = rootRef.orderByKey("typeOfConsulting").equalTo(item);
        console.log(queryRef, 'queryRef')
        queryRef.on("child_added", snap => {
            console.log(snap.val(), 'snap')
            let queriedItem = []
            snap.forEach(child => {
                console.log('queriedItem', child.val());
                queriedItem.push(child.val())
                console.log(queriedItem, 'something?')
            }).catch(error => {
                console.log('error', error)
            })
            this.setState({
                queriedConsultants: queriedItem
            })
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.firebaseSearch();
        // console.log(this.state.query, 'query')
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