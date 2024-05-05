import { BILL_REQUESTED, BILL_SUCCESS, BILL_ERROR, } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    billing: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case BILL_REQUESTED:
      return {...state, loading: true}
    case BILL_SUCCESS:
        return {...state, billing: action.payload.billing, loading: false }
    case BILL_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
