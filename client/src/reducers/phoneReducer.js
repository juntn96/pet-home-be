import {
  GET_CODE,
  CODE_LOADING,
} from '../actions/types';

const initialState = {
  code: '',
  messageSendCode: '',
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CODE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CODE:
      return {
        ...state,
        messageSendCode: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
