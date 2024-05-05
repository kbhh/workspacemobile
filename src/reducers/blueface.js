import { 
    BF_REQUESTED, BF_SUCCESS, BF_ERROR, BF_COMMETS, 
    BF_COMMET_ADDED, BF_REMOVE_SUCCESS
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    posts: [],
    comments: [],
    added: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case BF_REQUESTED:
      return {...state, loading: true}
    case BF_SUCCESS:
        return {...state, posts: action.payload.posts, loading: false }
    case BF_ERROR:
        return {...state, loading: false, error: true}
    case BF_COMMETS: 
        return {...state, loading: false, comments: action.payload.comments}
    case BF_COMMET_ADDED:
        return {...state, loading: false, added: true}
    case BF_REMOVE_SUCCESS:
        return {...state, added: false}
    default:
      return state
  }
}
