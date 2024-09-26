
// ACTION TYPES

// sign in and sign out
export const ON_SIGN_IN = 'ON_SIGN_IN';
export const ON_SIGN_UP = 'ON_SIGN_UP';
// sign in sign out actions types ENDS

// IS RESERVED
export const IS_RESERVED = 'IS_RESERVED';
export const IS_PAID = 'IS_PAID';

// ROOM DETAIL
export const ON_VIEW_ROOM_DETAILS = 'ON_VIEW_ROOM_DETAILS';

// ON OPEN UPDATE
export const ON_OPEN_UPDATE = 'ON_OPEN_UPDATE';

// REVIEWS
export const ON_OPEN_REVIEW = 'ON_OPEN_REVIEW';

// MAPS
export const ON_MAPS = 'ON_MAPS';

// GALLERY
export const ON_GALLERY = 'ON_GALLERY';

// LOADER
export const ON_LOADER = 'ON_LOADER';

// SELECTED ROOM
export const SET_SELECTED_ROOM = 'SET_SELECTED_ROOM';

// ON REVIEW
export const ON_REVIEW = 'ON_REVIEW';

// PERSONAL DETAILS VISIBILITY
export const PERSONAL_DETAILS_VISIBILITY = 'PERSONAL_DETAILS_VISIBILITY';

// BOOKINGS DETAILS VISIBILITY
export const BOOKINGS_DETAILS_VISIBILITY = 'BOOKINGS_DETAILS_VISIBILITY';

// FAVORITE DETAILS VISIBILITY
export const FAVORITE_DETAILS_VISIBILITY = 'FAVORITE_DETAILS_VISIBILITY';

// LIKED
export const LIKED = 'LIKED';


// ACTION TYPES ENDS


// ACTIONS CREATOR

// handles sign in and sign out
export const handleOnSignIn = ()=>{
    return {
        type: ON_SIGN_IN,
    }
}

export const handleOnSignUp = ()=>{
    return {
        type: ON_SIGN_UP,
    }
}
// handles sign in and sign out ENDS


// ROOM DETAIL
export const viewRoomDetails = ()=>{
    return {
        type: ON_VIEW_ROOM_DETAILS,
    }
}

// IS ROOM RESERVED
export const isRoomReserved = ()=>{
    return {
        type: IS_RESERVED,
    }
}

export const isRoomPaid = ()=>
{
    return {
        type: IS_PAID,
    }
}

// OPEN UPDATE
export const openUpdate = ()=>{
    return {
        type: ON_OPEN_UPDATE,
        }
    }

// REVIEWS
export const viewReviews = ()=>{
    return {
        type: ON_OPEN_REVIEW,
        }
    }

// ON REVIEW
export const onReviewing = ()=> {
    return{
        type: ON_REVIEW,
    }
}

// MAPS
export const viewMaps = ()=>{
    return {
        type: ON_MAPS,
    }
}

// GALLERY
export const viewGallery = ()=>{
    return {
        type: ON_GALLERY,
    }
}

// LOADER
export const showLoader = ()=>{
    return {
        type: ON_LOADER,
        }
    }

// SELECTED ROOM
export const setSelectedRoom = (roomId) => ({
    type: SET_SELECTED_ROOM,
    payload: roomId,
  });

// FAVORITE DETAILS VISIBILITY
export const setFavoriteDetailsVisibility = () => {
    return{
        type: FAVORITE_DETAILS_VISIBILITY,
    }
    };

//  BOOKINGS_DETAILS_VISIBILITY
export const setBookingsDetailsVisibility = () => {
    return{
        type: BOOKINGS_DETAILS_VISIBILITY,
        }
    };

// PERSONAL_DETAILS_VISIBILITY
export const setPersonalDetailsVisibility = () => {
    return{
        type: PERSONAL_DETAILS_VISIBILITY,
        }
    };


//  LIKED
export const setLiked = () => {
    return{
        type: LIKED,
        }
    };