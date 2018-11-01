import {
    CREATE_PRODUCT,
    GET_PRODUCT_PARENT_CATEGORIES,
    PRODUCT_PARENT_CATEGORIES_LOADING
  } from '../actions/types';
  
  const initialState = {
    productParentCategories: [],
    productParentCategory: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
          return {
            ...state,
            loading: true
          };
        case PRODUCT_PARENT_CATEGORIES_LOADING:
          return {
            ...state,
            loading: true
          };
        case GET_PRODUCT_PARENT_CATEGORIES:
          return {
            ...state,
            productParentCategories: action.payload,
            loading: false
          };
        default:
          return state;
      }
  }
  