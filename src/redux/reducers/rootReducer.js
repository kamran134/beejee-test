import { combineReducers } from 'redux';
import { taskReducer } from './task-reducer';
import { authReducer } from './auth-reducer';

export default combineReducers({
    taskReducer,
    authReducer
});