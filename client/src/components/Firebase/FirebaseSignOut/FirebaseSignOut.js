import React from 'react';
import './FirebaseSignOut.css';

import { auth } from '../../../firebase';

const FirebaseSignOut = () =>
  <button
    type="button"
    id='userSignOutButton'
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default FirebaseSignOut;