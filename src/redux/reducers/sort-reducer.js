import { SORT } from "../action-types"

const initialState = {
    field: null,
    direction: null
}

export const sortReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT:
            return {...action.params }
        default:
            return state;
    }
}