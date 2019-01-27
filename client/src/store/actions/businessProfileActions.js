export const createProfile = (businessProfile) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const userID = getState().firebase.auth.uid;
        firestore.collection('businessProfiles').add({
            ...businessProfile,
            firstName: profile.firstName,
            lastName: profile.lastName,
            userID: userID,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROFILE', businessProfile });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROFILE_ERROR', err });
        })
    }
}

export const updateProfile = (businessProfile) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const userID = getState().firebase.auth.uid;
        firestore.collection('businessProfiles').add({
            ...businessProfile,
            firstName: profile.firstName,
            lastName: profile.lastName,
            userID: userID,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROFILE', businessProfile });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROFILE_ERROR', err });
        })
    }
}