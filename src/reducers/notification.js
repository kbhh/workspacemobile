import { NOTIF_REQUESTED, NOTIF_SUCCESS, NOTIF_ERROR } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    notifications: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case NOTIF_REQUESTED:
      return {...state, loading: true}
    case NOTIF_SUCCESS:
        return {...state, notifications: action.payload.notifications, loading: false }
    case NOTIF_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
