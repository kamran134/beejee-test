import { SORT } from "../action-types";

const _sort = sortParams => ({
    type: SORT,
    params: sortParams
});

export const sortTask = (field, direction) => dispatch => (
    dispatch(_sort({ field, direction }))
);