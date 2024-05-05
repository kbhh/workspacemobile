import { SERVICES_REQUESTED, SERVICES_SUCCESS, SERVICES_ERROR, SERVICES_CATEGORY } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    services: [],
    categories: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SERVICES_REQUESTED:
      return {...state, loading: true}
    case SERVICES_SUCCESS:
        return {...state, services: action.payload.services, loading: false }
    case SERVICES_ERROR:
        return {...state, loading: false, error: true}
    case SERVICES_CATEGORY:
        return {...state, loading: false, categories: action.payload.categories}
    default:
      return state
  }
}
