import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import locationReducer from "./locationReducer";
import phoneReducer from "./phoneReducer";
import productReducer from "./productReducer.js";
import { RESET_STATE } from "./../actions/types";
import profileReducer from "./profileReducer";
import allUserReducer from "./allUserReducer";
import socketReducer from "./socketReducer";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  locationApp: locationReducer,
  sendCodeBySMS: phoneReducer,
  product: productReducer,
  profile: profileReducer,
  allusers: allUserReducer,
  socketState: socketReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};
