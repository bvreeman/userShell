import React from 'react';
import './FindAConsultant.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ProfilesList from '../../components/ProfilesList'
  
class FindAConsultant extends React.PureComponent {
  render() {
    // console.log('this.props', this.props)
    const { users, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div>
        < ProfilesList users={ users } auth={ auth } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      users: state.firestore.ordered.users,
      auth: state.firebase.auth,
      // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'users'},
      // { collection: 'businessProfiles', orderBy: ['createdAt', 'desc'] },
  ])
)(FindAConsultant)