import axios from 'axios';

import {
  CLEAR_ERRORS,
  GET_LOCATIONCATEGORIES,
  CATEGORY_LOADING,
  GET_LOCATION_DETAIL
} from './types';

// Get Posts
export const getLocationCategories = type => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get(`/api/location/locationCategories/${type}`)
    .then(res =>
      dispatch({
        type: GET_LOCATIONCATEGORIES,
        payload: res.data.locationCategories
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LOCATIONCATEGORIES,
        payload: null
      })
    );
};

// Get location detail
export const getLocations = ownerId => dispatch => {
  axios
    .get(`/api/location/detail/${ownerId}`)
    .then(res =>
      dispatch({
        type: GET_LOCATION_DETAIL,
        payload: res.data.locationProfile
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LOCATION_DETAIL,
        payload: null
      })
    );
};

// Set loading state
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
