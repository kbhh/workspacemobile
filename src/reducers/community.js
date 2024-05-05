import { COMMUNITY_REQUESTED, COMMUNITY_SUCCESS, COMMUNITY_ERROR } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    members: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case COMMUNITY_REQUESTED:
      return {...state, loading: true}
    case COMMUNITY_SUCCESS:
        return {...state, members: action.payload.members, loading: false }
    case COMMUNITY_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
