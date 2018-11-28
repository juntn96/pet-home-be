import {
  GET_LOCATIONCATEGORIES,
  CATEGORY_LOADING,
  GET_LOCATION_DETAIL
} from '../actions/types';

const initialState = {
  locationCategories: [],
  locationCategory: {},
  locationDetail: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LOCATIONCATEGORIES:
      return {
        ...state,
        locationCategories: action.payload,
        loading: false
      };
    case GET_LOCATION_DETAIL: 
      return {
        ...state,
        locationDetail: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
