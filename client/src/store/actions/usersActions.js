import axios from 'axios';

import {
   GET_ALL_USERS, BAN_USER_BY_ID
} from './types';

// Get Profile
export const getAllUsers = () => dispatch => {
  axios.get(`/api/admin/users`)
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_USERS,
        payload: null
      })
    );
  };

export const banUserById = (user) => dispatch => {
  axios
    .put(`/api/admin/users`,user)
    .then(res =>
      dispatch({
        type: BAN_USER_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: BAN_USER_BY_ID,
        payload: null
      })
    );
};