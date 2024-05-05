import { 
    GUEST_REQUESTED, GUEST_SUCCESS, GUEST_ERROR,
    ADD_GUEST_ERROR, ADD_GUEST_REQUESTED, ADD_GUEST_SUCCESS,
    MEETUP_SESSION_REQUESTED, MEETUP_SESSION_SUCCESS, MEETUP_SESSION_ERROR,
    ADD_MEETUP_SESSION_ERROR, ADD_MEETUP_SESSION_SUCCESS, ADD_MEETUP_SESSION_REQUEST, EDIT_GUEST_REQUESTED, EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR, DELETE_GUEST_REQUESTED, DELETE_GUEST_SUCCESS, DELETE_GUEST_ERROR, EDIT_MEETUP_SESSION_REQUESTED, EDIT_MEETUP_SESSION_SUCCESS, EDIT_MEETUP_SESSION_ERROR, SELECT_MEETUP_SESSION, GET_SINGLE_MEETUP_SESSION, GET_SINGLE_MEETUP_SUCCESS, GET_SINGLE_MEETUP_ERROR, DELETE_MEETUP_SESSION_REQUESTED, DELETE_MEETUP_SESSION_SUCCESS, DELETE_MEETUP_SESSION_ERROR
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    guests: [],
    currentMeetupSession: {},
    meetupSessions: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case MEETUP_SESSION_REQUESTED:
      return {...state, loading: true}
    case MEETUP_SESSION_SUCCESS:
        return {...state, meetupSessions: action.payload.meetupSessions, loading: false }
    case MEETUP_SESSION_ERROR:
        return {...state, loading: false, error: true}
    case ADD_MEETUP_SESSION_REQUEST:
        return {...state, loading: true}
    case ADD_MEETUP_SESSION_SUCCESS:
        return {...state, loading: false, currentMeetupSession: action.payload.meetupSession}
    case ADD_MEETUP_SESSION_ERROR:
        return {...state, error: true, loading: false}
    case ADD_GUEST_REQUESTED:
        return {...state, loading: true, session: action.payload.session}
    case ADD_GUEST_SUCCESS:
        return {...state, loading: false}
    case ADD_GUEST_ERROR:
        return {...state, loading: false, error: true}
    case EDIT_GUEST_REQUESTED:
        return {...state, loading: true}
    case EDIT_GUEST_SUCCESS:
        return {...state, loading: false}
    case EDIT_GUEST_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    case DELETE_GUEST_REQUESTED:
        return {...state, loading: true}
    case DELETE_GUEST_SUCCESS:
        return {...state, loading: false}
    case DELETE_GUEST_ERROR: 
        return {...state, loading: false}
    case EDIT_MEETUP_SESSION_REQUESTED:
        return {...state, loading: true}
    case EDIT_MEETUP_SESSION_SUCCESS:
        return {...state, loading: false}
    case EDIT_MEETUP_SESSION_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    case SELECT_MEETUP_SESSION:
        return {...state, currentMeetupSession: action.payload.meetupSession}
    case GET_SINGLE_MEETUP_SESSION:
        return {...state, loading: true}
    case GET_SINGLE_MEETUP_SUCCESS:
        return {...state, loading: false, currentMeetupSession: action.payload.meetupSession}
    case GET_SINGLE_MEETUP_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    case DELETE_MEETUP_SESSION_REQUESTED:
        return {...state, loading: true}
    case DELETE_MEETUP_SESSION_SUCCESS:
        return {...state, loading: false}
    case DELETE_MEETUP_SESSION_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    default:
      return state
  }
}
