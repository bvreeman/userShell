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
    
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const queryRef = rootRef.child('react');

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
            <form>
                <input
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
            </form>
        )
    }
}

export default SearchBar;