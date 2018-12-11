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

    render() {
      return(
        <div>
          {console.log(this.state.users)}
          <p>User Page</p>
        </div>
      )
    }
}

export default UserPage;