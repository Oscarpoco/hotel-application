import { ON_SIGN_IN, ON_SIGN_UP, ON_VIEW_ROOM_DETAILS } from "../actions/UserInterface";

// INTIAL STATE

const initialState = {
    isSignInOpen: false,
    isSignUpOpen: false,
    isViewRoomDetailsOpen: false,
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
                isViewRoomDetailsOpen: !state.isViewRoomDetailsOpen,
            }

        default:
            return state
    }
};

export default userInterfaceReducer