import axios from 'axios';

import {
  CREATE_PRODUCT,
  GET_PRODUCT_CATEGORIES,
  GET_ERRORS,
  CODE_LOADING
} from './types';

// Get Posts
export const getProductCategories = () => dispatch => {
    dispatch(setLoading());
    axios
      .get('/api/product/productCategories')
      .then(res =>
        dispatch({
          type: GET_PRODUCT_CATEGORIES,
          payload: res.data.productCategories
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PRODUCT_CATEGORIES,
          payload: null
        })
      );
  };

export const createProduct = product => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/product/add', product)
    .then(res =>
      {
        dispatch(
          {
            type: CREATE_PRODUCT,
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
export const setLoading = () => {
  return {
    type: CODE_LOADING
  };
};