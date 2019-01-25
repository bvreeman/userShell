import React from 'react';
import './FindAConsultant.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ProfilesList from '../../components/ProfilesList'
  
class FindAConsultant extends React.PureComponent {
  render() {
    const { profiles, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin' />
    console.log(profiles, 'profiles inside find a consultant page')
    return (
      <div>
        < ProfilesList profiles={ profiles } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('here', state);
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