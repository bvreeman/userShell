import React from 'react';
import './UserPage.css';
import { db } from '../../firebase';

class UserPage extends React.PureComponent {
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

}

export default UserPage;