
import authReducer from './authReducer';
import businessProfileReducer from './businessProfileReducer'
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    businessProfile: businessProfileReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer