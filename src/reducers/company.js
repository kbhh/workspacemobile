import { 
    COMPANY_REQUESTED, COMPANY_SUCCESS, COMPANY_ERROR,
    COMPANY_ADDED, COMPANY_ADDED_REMOVE
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "added": false,
    "errorMessage": "",
    companies: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case COMPANY_REQUESTED:
      return { ...state, loading: true }
    case COMPANY_SUCCESS:
        return { ...state, companies: action.payload.companies, loading: false }
    case COMPANY_ERROR:
        return { ...state, loading: false, error: true }
    case COMPANY_ADDED:
        return { ...state, loading: false, added: true }
    case COMPANY_ADDED_REMOVE:
        return { ...state, added: false }
    default:
      return state
  }
}
