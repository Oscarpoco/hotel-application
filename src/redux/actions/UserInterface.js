
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