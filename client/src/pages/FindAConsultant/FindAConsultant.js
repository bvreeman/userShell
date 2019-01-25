import React from 'react';
import './FindAConsultant.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
  
class FindAConsultant extends React.PureComponent {
  render() {
    const { projects, auth, notifications } = this.props
    if (!auth.uid) return <Redirect to='/signin' />

    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
      profiles: state.firestore.ordered.profiles,
      auth: state.firebase.auth,
      // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'profiles'}
      // { collection: 'profiles', orderBy: ['createdAt', 'desc'] },
  ])
)(FindAConsultant)