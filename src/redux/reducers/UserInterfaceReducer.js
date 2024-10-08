import { 
    IS_PAID,
    IS_RESERVED,
    ON_SIGN_IN, 
    ON_SIGN_UP, 
    ON_VIEW_ROOM_DETAILS, 
    ON_OPEN_UPDATE, 
    ON_OPEN_REVIEW,
    ON_MAPS,
    ON_GALLERY,
    ON_LOADER,
    SET_SELECTED_ROOM,
    ON_REVIEW,
    PERSONAL_DETAILS_VISIBILITY,
    BOOKINGS_DETAILS_VISIBILITY,
    FAVORITE_DETAILS_VISIBILITY,
    LIKED,
    HUMBURGER_TOGGLE,
} 
    from "../actions/UserInterface";

// INTIAL STATE

const initialState = {
    isSignInOpen: false,
    isSignUpOpen: false,
    isViewRoomDetailsOpen: false,
    isReserved: false,
    isPaid: false,
    isUpdateOpen: false,
    isReviewOpen: false,
    isMapOpen: false,
    isGalleryOpen: false,
    isLoading: false,
    selectedRoom: null,
    reviewing: false,
    personalDetailsVisibility: false,
    bookingsDetailsVisibility: false,
    favoriteDetailsVisibility: false,
    isLiked: false,
    isHumburger: false,
}

// INITIAL STATE ENDS

// REDUCER

const userInterfaceReducer = (state = initialState, action) =>{
    switch(action.type){
        
        // open sign in form
        case ON_SIGN_IN:
            return{
                ...state,
                isSignInOpen: !state.isSignInOpen
            };
        // open sign in form ENDS
        case ON_SIGN_UP:
            return{
                ...state,
                isSignUpOpen: !state.isSignUpOpen
            };
        // VIEW ROOM DETAILS
        case ON_VIEW_ROOM_DETAILS:
            return {
                ...state,
                isViewRoomDetailsOpen: !state.isViewRoomDetailsOpen
            };
            // VIEW ROOM DETAILS ENDS

            // IS RESERVED
            case IS_RESERVED:
                return {
                    ...state,
                    isReserved: !state.isReserved
                    }
                // IS PAID
            case IS_PAID:
                return {
                    ...state,
                    isPaid: !state.isPaid
                    }
            // IS RESERVED & IS PAID ENDS

            // OPEN UPDATE
            case ON_OPEN_UPDATE:
                return {
                    ...state,
                    isUpdateOpen: !state.isUpdateOpen
                    }
            // OPEN UPDATE ENDS

            // OPEN REVIEWS
            case ON_OPEN_REVIEW:
                return{
                    ...state,
                    isReviewOpen: !state.isReviewOpen
                }
            case ON_REVIEW:
                return{
                    ...state,
                    reviewing: !state.reviewing
                }

            // MAPS
            case ON_MAPS:
                return{
                    ...state,
                    isMapOpen: !state.isMapOpen
                }

            // GALLERY
            case ON_GALLERY:
                return{
                    ...state,
                    isGalleryOpen: !state.isGalleryOpen
                }

            // LOADER
            case ON_LOADER:
                return{
                    ...state,
                    isLoading: !state.isLoading,
                    }
            // LOADER ENDS

            // SELECTED ROOM
            case SET_SELECTED_ROOM:
                return {
                ...state,
                selectedRoom: action.payload,
                    }

            // PERSONAL_DETAILS_VISIBILITY
            case PERSONAL_DETAILS_VISIBILITY:
                return{
                    ...state,
                    personalDetailsVisibility: !state.personalDetailsVisibility,
                }

            // BOOKINGS_DETAILS_VISIBILITY
            case BOOKINGS_DETAILS_VISIBILITY:
                return{
                    ...state,
                    bookingsDetailsVisibility: !state.bookingsDetailsVisibility,
                    }

            // FAVORITE_DETAILS_VISIBILITY
            case FAVORITE_DETAILS_VISIBILITY:
                return{
                    ...state,
                    favoriteDetailsVisibility: !state.favoriteDetailsVisibility,
                    }

            // LIKED
            case LIKED:
                return{
                    ...state,
                    isLiked: !state.isLiked
                    }

            // HUMBURGER_TOGGLE
            case HUMBURGER_TOGGLE:
                return{
                    ...state,
                    isHumburger: !state.isHumburger
                    }

        default:
            return state
    }
};

export default userInterfaceReducer