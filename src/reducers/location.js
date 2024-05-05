import { LOCATION_REQUESTED, LOCATION_SUCCESS, LOCATION_ERROR } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    locations: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOCATION_REQUESTED:
      return {...state, loading: true}
    case LOCATION_SUCCESS:
        return {...state, locations: action.payload.locations, loading: false }
    case LOCATION_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
