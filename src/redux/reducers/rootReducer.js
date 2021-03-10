import { combineReducers } from 'redux';
import { taskReducer } from './task-reducer';
import { authReducer } from './auth-reducer';
import { sortReducer } from './sort-reducer';

export default combineReducers({
    taskReducer,
    authReducer,
    sortReducer
});