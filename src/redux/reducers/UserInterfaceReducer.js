import { ON_SIGN_IN } from "../actions/UserInterface";

// INTIAL STATE

const initialState = {
    isSignInOpen: false,
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

        default:
            return state
    }
};

export default userInterfaceReducer