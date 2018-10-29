import isEmpty from '../../validation/is-empty';

import { SET_CURRENT_USER, SEND_PASS_LOADING } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SEND_PASS_LOADING:
      return {
        loading: true
      };
    default:
      return state;
  }
}
