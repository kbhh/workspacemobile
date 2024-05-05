import { ADD_EVENT_REQUESTED, EVENT_ERROR, ADD_EVENT_SUCCESS } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    added: false,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_EVENT_REQUESTED:
      return {...state, loading: true};
    case EVENT_ERROR:
        return {...state, loading: false, error: true };
    case ADD_EVENT_SUCCESS:
        return {...state, loading: false, added: true };
    default:
      return state;
  }
}
