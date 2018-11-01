import {
    CREATE_PRODUCT,
    GET_PRODUCT_CATEGORIES
  } from '../actions/types';
  
  const initialState = {
    code: '',
    messageSendCode: '',
    messageCheckCode: '',
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
          return {
            ...state,
            loading: true
          };
        case GET_PRODUCT_CATEGORIES:
          return {
            ...state,
            productCategories: action.payload,
            loading: false
          };
        default:
          return state;
      }
  }
  