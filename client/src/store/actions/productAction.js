import axios from 'axios';

import {
  CREATE_PRODUCT,
  GET_PRODUCT_PARENT_CATEGORIES,
  GET_ERRORS,
  PRODUCT_PARENT_CATEGORIES_LOADING,
  CREATE_PRODUCT_PARENT_CATEGORIES,
} from './types';

// Get Posts
export const getProductParentCategories = ownerId => dispatch => {
    dispatch(setProductParentCategoriesLoading());
    axios
      .get(`/api/product/productParentCategories/${ownerId}`)
      .then(res =>{
        console.log(res.data)
        dispatch({
          type: GET_PRODUCT_PARENT_CATEGORIES,
          payload: res.data.productParentCategories
        })
      }
      )
      .catch(err =>
        dispatch({
          type: GET_PRODUCT_PARENT_CATEGORIES,
          payload: null
        })
      );
  };

export const createProduct = product => dispatch => {
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

export const createProductParentCategories = productParentCategories => dispatch => {
  axios
    .post('/api/product/addProductParentCategory', productParentCategories)
    .then(res =>
      {
        dispatch(
          {
            type: CREATE_PRODUCT_PARENT_CATEGORIES,
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
export const setProductParentCategoriesLoading = () => {
  return {
    type: PRODUCT_PARENT_CATEGORIES_LOADING
  };
};
