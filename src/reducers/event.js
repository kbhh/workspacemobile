import { 
    EVENT_REQUESTED, EVENT_SUCCESS, EVENT_ERROR, REQ_SUCCESS, 
    ADD_EVENT_SUCCESS, REMOVE_EVENT_SUCCESS, FETCH_EVENT_PACKAGE_REQUESTED, FETCH_EVENT_PACKAGE_SUCCESS, FETCH_EVENT_PACKAGE_ERROR 
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    events: [],
    privateEvents: [],
    added: false,
    packages: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case EVENT_REQUESTED:
      return {...state, loading: true}
    case EVENT_SUCCESS:
        return {...state, events: action.payload.publicEvent, privateEvents: action.payload.privateEvent, loading: false }
    case REQ_SUCCESS:
        return {...state, loading: false }
    case EVENT_ERROR:
        return {...state, loading: false, error: true }
    case ADD_EVENT_SUCCESS:
        return {...state, loading: false, added: true }
    case REMOVE_EVENT_SUCCESS: 
        return {...state, added: false }
    case FETCH_EVENT_PACKAGE_REQUESTED:
        return {...state, loading: true}
    case FETCH_EVENT_PACKAGE_SUCCESS:
        return {...state, loading: false, packages: action.payload.packages}
    case FETCH_EVENT_PACKAGE_ERROR:
        return {...state, loading: false, error: false, error: action.error}
    default:
      return state
  }
}
