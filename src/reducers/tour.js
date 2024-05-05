import { TOUR_REQUESTED, TOUR_SUCCESS, TOUR_ERROR } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    tours: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOUR_REQUESTED:
      return {...state, loading: true}
    case TOUR_SUCCESS:
        return {...state, tours: action.payload.tours, loading: false }
    case TOUR_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
