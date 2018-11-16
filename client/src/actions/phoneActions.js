import axios from 'axios';

import {
  CODE_LOADING,
  GET_CODE,
  GET_ERRORS
} from './types';

// Get Posts
export const getVertificationCode = phoneData => dispatch => {
  dispatch(setSendCodeLoading());
  axios
    .post('/api/phone/sms', phoneData)
    .then(res =>
      {
        dispatch(
          {
            type: GET_CODE,
            payload: res.data
          },        
        )
      }
     )
    .catch(err =>
      {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.error 
        })
      }
    );
};

// Set loading state
export const setSendCodeLoading = () => {
  return {
    type: CODE_LOADING
  };
};