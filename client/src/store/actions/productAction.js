import axios from 'axios';

import {
  CREATE_PRODUCT,
  GET_PRODUCT_PARENT_CATEGORIES,
  GET_ERRORS,
  PRODUCT_PARENT_CATEGORIES_LOADING,
  PRODUCT_PRODUCT_BY_USER_ID_LOADING,
  GET_PRODUCT_BY_USER_ID
} from './types';

// Get Product Category
export const getProductParentCategories = ownerId => dispatch => {
    dispatch(setProductParentCategoriesLoading());
    axios
      .get(`/api/product/productParentCategories/${ownerId}`)
      .then(res =>
        dispatch({
          type: GET_PRODUCT_PARENT_CATEGORIES,
          payload: res.data.productParentCategories
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PRODUCT_PARENT_CATEGORIES,
          payload: null
        })
      );
  };

export const createProduct = (product, history) => dispatch => {
  axios
    .post('/api/product/add', product)
    .then(res =>
        history.push('/product')
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

export const getProductByIds = ownerId => dispatch => {
  dispatch(setProductByUserIdLoading());
  axios
    .get(`/api/product/productByUserIds/${ownerId}`)
    .then(res =>
      dispatch({
        type: GET_PRODUCT_BY_USER_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCT_BY_USER_ID,
        payload: null
      })
    );
};

// Set loading state
export const setProductParentCategoriesLoading = () => {
  return {
    type: PRODUCT_PARENT_CATEGORIES_LOADING
  };
};

export const setProductByUserIdLoading = () => {
  return {
    type: PRODUCT_PRODUCT_BY_USER_ID_LOADING
  };
};
