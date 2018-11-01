import {
    CREATE_PRODUCT,
    GET_PRODUCT_PARENT_CATEGORIES,
    PRODUCT_PARENT_CATEGORIES_LOADING,
    CREATE_PRODUCT_PARENT_CATEGORIES,
    PRODUCT_PRODUCT_BY_USER_ID_LOADING,
    GET_PRODUCT_BY_USER_ID
  } from '../actions/types';
  
  const initialState = {
    productParentCategories: [],
    productParentCategory: {},
    productByUserIds: [],
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
        case CREATE_PRODUCT_PARENT_CATEGORIES:
          return {
            ...state,
            loading: true
          }
        case PRODUCT_PRODUCT_BY_USER_ID_LOADING:
          return {
            ...state,
            loading: true
          };
        case GET_PRODUCT_BY_USER_ID:
          return {
            ...state,
            productByUserIds: action.payload,

            loading: false
          };
        default:
          return state;
      }
  }
  