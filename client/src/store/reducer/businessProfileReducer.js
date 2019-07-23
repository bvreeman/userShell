const initState = {
    businessProfiles: [
        { id: '1', businessName: 'Sunshine Consulting', 
        businessDescription: 'We perform solar panel consulting',
        website: 'www.sunshinesolarconsulting.com',
        facebook: 'www.facebook.com',
        twitter: 'www.twitter.com',
        linkedIn: 'www.linkedin.com',
        instagram: 'www.instagram.com',
        consultingType: 'Construction, Solar, Environmental',
        typeOfConsultant: [],
        chosenConsultingOption: [],
        }
    ],
    users: [],
    loading: false,
    error: null
}

const businessProfileReducter = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BUSINESS_PROFILE': 
            console.log('created business profile', action.businessProfile)
            return state;
        case 'CREATE_BUSINES_PROFILE_ERROR': 
            console.log('create business profile error', action.err);
            return state;
        default:
            return state;
    }
}



export default businessProfileReducter;