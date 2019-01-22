const initState = {
    businessProfiles: [
        { id: '1', businessName: 'Sunshine Consulting', 
        businessDescription: 'We perform solar panel consulting',
        website: 'www.sunshinesolarconsulting.com',
        facebookPage: 'www.facebook.com',
        twitterHandle: 'www.twitter.com',
        instagramHandle: 'www.instagram.com',
        consultingType: 'Construction, Solar, Environmental',
        businessExperience: 'I put solar panels on the Spanish Palace' }
    ]
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