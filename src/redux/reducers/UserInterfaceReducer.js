import { IS_PAID,IS_RESERVED,ON_SIGN_IN, ON_SIGN_UP, ON_VIEW_ROOM_DETAILS, ON_OPEN_UPDATE } from "../actions/UserInterface";

// INTIAL STATE

const initialState = {
    isSignInOpen: false,
    isSignUpOpen: false,
    isViewRoomDetailsOpen: false,
    isReserved: false,
    isPaid: false,
    isUpdateOpen: false
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


        default:
            return state
    }
};

export default userInterfaceReducer