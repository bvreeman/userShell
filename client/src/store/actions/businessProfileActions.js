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

export const updateProfile = (users) => {
    if (users.chosenConsultingOption !== undefined) {
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            // make async call to database
            const firestore = getFirestore();
            const profile = getState().firebase.profile
            const userID = getState().firebase.auth.uid;
            firestore.collection('users').doc(userID).update({
                ...profile,
                firstName: users.firstName,
                lastName: users.lastName,
                businessName: users.businessName,
                businessDescription: users.businessDescription,
                website: users.website,
                facebook: users.facebook,
                linkedIn: users.linkedIn,
                twitter: users.twitter,
                instagram: users.instagram,
                typeOfConsulting: users.typeOfConsulting,
                chosenConsultingOption: users.chosenConsultingOption
            }).then(() => {
                dispatch({ type: 'UPDATED_PROFILE', profile });
                console.log('update successful')
            }).catch((err) => {
                dispatch({ type: 'UPDATE_PROFILE_ERROR', err });
                console.log('There was an error', err)
            })
        }
    } else {
        return (dispatch, getState, { getFirebase, getFirestore }) => {
            // make async call to database
            const firestore = getFirestore();
            const profile = getState().firebase.profile
            const userID = getState().firebase.auth.uid;
            firestore.collection('users').doc(userID).update({
                ...profile,
                firstName: users.firstName,
                lastName: users.lastName,
                businessName: users.businessName,
                businessDescription: users.businessDescription,
                website: users.website,
                instagram: users.instagram,
                linkedIn: users.linkedIn,
                facebook: users.facebook,
                twitter: users.twitter,
            }).then(() => {
                dispatch({ type: 'UPDATED_PROFILE', profile });
                console.log('update successful')
            }).catch((err) => {
                dispatch({ type: 'UPDATE_PROFILE_ERROR', err });
                console.log('There was an error', err)
            })
        }
    }
}

export const updatePhoto = (users) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile
        const userID = getState().firebase.auth.uid;
        firestore.collection('users').doc(userID).update({
            ...profile,
            imageURL: users.imageURL,
        }).then(() => {
            dispatch({ type: 'UPDATED_PHOTO', profile });
            console.log('store action update successful')
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PHOTO_ERROR', err });
            console.log('There was an error', err)
        })
    }
}