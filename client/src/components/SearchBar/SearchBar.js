import React, { Component } from 'react';
import './SearchBar.css'
import firebase from "firebase/app";
import 'firebase/database';

class SearchBar extends Component {
    state = {
        query: '',
    }

    handleInputChange = () => {
        this.setState({
          query: this.search.value
        })
      }

    onSubmit = (e) => {
        e.preventDefault();
        this.firebaseSearch();
        document.getElementById("queryForm").reset();

    }
    
    firebaseSearch() {
        const rootRef = firebase.database().ref("users");
        let item = this.state.query.toString()
        console.log(item, 'item')
        const queryRef = rootRef.child(item);
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
        return (
            <form id='queryForm' onSubmit={this.onSubmit}>
                <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
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