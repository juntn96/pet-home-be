import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import locationReducer from './locationReducer';
import phoneReducer from './phoneReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  locationApp: locationReducer,
  sendCodeBySMS: phoneReducer
});
