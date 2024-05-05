import { NEXT_SCREEN, SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_REQUESTED } from '../actionTypes';

const initialState = {
    registered: false,
    loading: false,
    error: false,
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "userName": "",
    "password": "",
}

export default function(state = initialState, action) {
  switch(action.type) {
    case NEXT_SCREEN:
      return {
          ...state, 
            registered: false,
            "firstName": action.payload.firstName,
            "lastName": action.payload.lastName,
            "email": action.payload.email,
            "birthDate": action.payload.birthDate,
    }
    case SIGNUP_REQUESTED:
      return {
        ...state, loading: true, registered: false,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state, 
        loading: false,
        registered: true,
        error: false,
      }
    case SIGNUP_ERROR:
      return {
        ...state, error: true, loading: false, registered: false,
      }
    default:
      return state
  }
}
