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
    const { businessProfiles, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div>
        < ProfilesList businessProfiles={ businessProfiles } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      businessProfiles: state.firestore.ordered.businessProfiles,
      auth: state.firebase.auth,
      // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'businessProfiles'}
      // { collection: 'businessProfiles', orderBy: ['createdAt', 'desc'] },
  ])
)(FindAConsultant)