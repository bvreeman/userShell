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
        title: '',
      };
    }
  
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() }) 
    );
  }

  mouseEnterDisplayTitle() {
    console.log('mouse enter')
    return(
      <div>
        {/* {item.Images.title} */}
      </div>
    )
  }

  mouseLeaveDisplayTitle(props) {
    console.log('props leaving', props)
  }

  render() {
    const { users } = this.state;
    let consultants; 

    if (users === null) {
      return (
        <p>No users Found</p>
        )
    } else {
      // console.log('is it here', this.state)
      consultants = Object.values(users).map((item, i) => {
        // console.log('heres item', item)
          return(
            <div key={item.Images.name}>
              <img alt={item.Images.title} title={item.Images.title} className="findAConsultantPageImages" src={item.Images.url} />
            </div>
          )
        })
        return (
          <div>
              <div>
                {consultants}
              </div>
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