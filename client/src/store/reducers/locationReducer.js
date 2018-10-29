import {
  GET_LOCATIONCATEGORIES,
  CATEGORY_LOADING,
} from '../actions/types';

const initialState = {
  locationCategories: [],
  locationCategory: {},
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
    default:
      return state;
  }
}
