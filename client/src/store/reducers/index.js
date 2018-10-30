import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import locationReducer from './locationReducer';
import phoneReducer from './phoneReducer';
import {RESET_STATE} from './../actions/types';

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  locationApp: locationReducer,
  sendCodeBySMS: phoneReducer
});

export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined
  }

  return appReducer(state, action)
}