import {LOGIN_REQUESTED, AUTH_SUCCESS, AUTH_ERROR, REQ_SUCCESS, RESET_SUCCESS } from '../actionTypes';

const initialState = {
    email: '',
    password: '',
    authenticated: false,
    loading: false,
    error: false,
    token: '',
    notification: '',
    reseted: false,
    message: '',
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN_REQUESTED:
      return {...state, loading: true}
    case AUTH_SUCCESS:
        return {...state, loading: false, token: action.payload.token, authenticated: true}
    case AUTH_ERROR:
        return {...state, loading: false, error: true}
    case REQ_SUCCESS:
        return {...state, loading: false }
    case RESET_SUCCESS:
        return {...state, loading: false, message: action.payload.message, reseted: true}
    default:
      return state
  }
}
