
// ACTION TYPES

// sign in and sign out
export const ON_SIGN_IN = 'ON_SIGN_IN';
export const ON_SIGN_UP = 'ON_SIGN_UP';
// sign in sign out actions types ENDS



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