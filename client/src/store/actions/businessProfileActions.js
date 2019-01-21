export const createProfile = (businessProfile) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const userID = getState().firebase.auth.uid;
        firestore.collection('businessProfile').add({
            ...businessProfile,
            userFirstName: profile.firstName,
            userLastName: profile.lastName,
            userID: userID,
            // businessName: profile.businessName,
            // businessDescription: profile.businessDescription,
            // website: profile.website,
            // facebookPage: profile.facebookPage,
            // twitterHandle: profile.twitterHandle,
            // instagramHandle: profile.instagramHandle,
            // consultingType: profile.consultingType,
            // businessExperience: profile.businessExperience,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROFILE', businessProfile });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROFILE_ERROR', err });
        })
    }
}