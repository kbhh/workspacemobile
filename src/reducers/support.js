import { 
    SUPPORT_REQUESTED, SUPPORT_SUCCESS, SUPPORT_ERROR,
    ADD_SUPPORT_REQUESTED, ADD_SUPPORT_SUCCESS, ADD_SUPPORT_ERROR,
    ADD_SUPPORT_FEEDBACK_ERROR, ADD_SUPPORT_FEEDBACK_REQUESTED, ADD_SUPPORT_FEEDBACK_SUCCESS,
    GET_TICKET_DETAIL_ERROR, GET_TICKET_DETAIL_REQUESTED, GET_TICKET_DETAIL_SUCCESS,
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    tickets: [],
    currentTicket: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SUPPORT_REQUESTED:
      return {...state, loading: true}
    case SUPPORT_SUCCESS:
        return {...state, tickets: action.payload.tickets, loading: false }
    case SUPPORT_ERROR:
        return {...state, loading: false, error: true}
    case ADD_SUPPORT_REQUESTED:
        return {...state, loading: true}
    case ADD_SUPPORT_SUCCESS:
        return {...state, loading: false}
    case ADD_SUPPORT_ERROR:
        return {...state, loading: false, error: true}
    case GET_TICKET_DETAIL_REQUESTED:
        return {...state, loading: true}
    case GET_TICKET_DETAIL_SUCCESS:
        return {...state, loading: false, currentTicket: action.payload.ticket}
    case GET_TICKET_DETAIL_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    case ADD_SUPPORT_FEEDBACK_REQUESTED:
        return {...state, loading: true}
    case ADD_SUPPORT_FEEDBACK_SUCCESS:
        let ticket = {...state.currentTicket}
        ticket.messages.push(action.payload.message)
        return {...state, loading: false, currentTicket: ticket}
    case ADD_SUPPORT_FEEDBACK_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    default:
      return state
  }
}
