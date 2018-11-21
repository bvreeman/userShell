import React from 'react';
import './FindAConsultant.css';

import { db } from '../../firebase';
// import firebase from 'firebase/app';
// import "firebase/database";
// import 'firebase/auth'  

class AllUsersPage extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          users: null,
        };
      }
    
      componentDidMount() {
        db.onceGetUsers().then(snapshot =>
          this.setState({ users: snapshot.val() })
        );
      }

    render() {
        const { users } = this.state;
        console.log('users', users)

        return (
        <div>
            <p>users page</p>
            { !!users && <UserList users={users} /> }
        </div>
        )
    }
}

const UserList = ({ users }) =>
  <div>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

export default AllUsersPage;