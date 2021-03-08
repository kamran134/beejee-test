import { CREATE_TASK, GET_TASKS } from "../action-types"

const initialState = [];

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            state.push(action.payload);
            return state;
        case GET_TASKS:
            return action.payload;
        default:
            return state;
    }
}