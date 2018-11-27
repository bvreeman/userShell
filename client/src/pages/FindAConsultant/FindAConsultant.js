import React from 'react';
import './FindAConsultant.css';

import { db } from '../../firebase';

// import firebase from 'firebase/app';
// import "firebase/database";
// import 'firebase/auth'  

// const UserList = ({ users }) =>
  // <div >
  //   {Object.keys(users).map(key =>
  //       <div key={key} >
  //       <img  title={users[key].username} alt={users[key].Images.title} className="findAConsultantPageImages" src={users[key].Images.url} />
  //       <p key={key}>{users[key].username}</p>
  //     </div>
  //   )}
  // </div>

// const UserList = ({ users }) => {
//   let consultants
//   return(
//     <div >
//       {consultants = Object.keys(users).map(key => {
//           return(
//             <div key={key} >
//               <img  title={users[key].username} alt={users[key].Images.title} className="findAConsultantPageImages" src={users[key].Images.url} />
//                <p key={key}>{users[key].username}</p>
//             </div>          )
//         })
//         }
//         {console.log('this is consultants', consultants)}
//     </div>
//   )
// }
  
class FindAConsultant extends React.PureComponent {
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
    console.log(users, 'users')
              // console.log('users', users)
    // console.log('state', this.state)
    let consultants; 
    let consultantsDisplay;

    if (users === null) {
      return (
        <p>No users Found</p>
        )
    } else {
      console.log('is it here', this.state)
      consultants = Object.entries(users).map((item, i) => {
        console.log('heres item', item)
          return(
            <div key={item[0]} >
              <img alt={item[1].Images.title} className="findAConsultantPageImages" src={item[1].Images.url} />
            </div>
          )
        })
        consultantsDisplay = consultants.forEach((item, i) => {
          console.log('what about this forEach item', item)
          return(
            <div key={item.key} >
              <img alt={item.props.children.props.alt} className="findAConsultantPageImages" src={item.props.children.props.url} />
            </div>
          )
        })
        console.log(consultantsDisplay, 'this is the first consultants')
        return (
          <div>
            <div>
              <p>does this exist</p>
              {console.log('consultants', consultants)}
            </div>
            {/* <div key={info.name} className="art col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"  onClick={() => this.handleOpenModal(i)}>
                <img alt={info.Images.title} className="art-img" src={info.Images.url} /> */}
                {consultants}
            {/* </div> */}
          </div>
        )
      }

      // return (
      //   <div >
      //       { !!users && <UserList users={users} /> }
      //   </div>
      // )
  }
}

export default FindAConsultant;