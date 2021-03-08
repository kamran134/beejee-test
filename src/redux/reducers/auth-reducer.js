import { LOGIN } from "../action-types"

const initialState = {
    token: localStorage.getItem('beejee.token') || null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('beejee.token', action.payload.token);
            return action.payload;
        default:
            return state;
    }
}