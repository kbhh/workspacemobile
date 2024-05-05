import { 
    WORKSPACE_REQUESTED, WORKSPACE_SUCCESS, WORKSPACE_ERROR, 
    WORKSPACE_CATEGORY, ADD_WORKSPACE_SUCCESS, REMOVE_WORKSPACE_SUCCESS, UPLOAD_IMAGE_REQUESTED, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS
} from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    workspaces: [],
    hot: [],
    dedicated: [],
    enclosed: [],
    added: false,
    hotPackages: [],
    enclosedPackages: [],
    dedicatedPackages: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case WORKSPACE_REQUESTED:
      return {...state, loading: true}
    case WORKSPACE_SUCCESS:
        return {...state, workspaces: action.payload.workspaces, loading: false }
    case WORKSPACE_ERROR:
        return {...state, loading: false, error: true}
    case WORKSPACE_CATEGORY:
        return {
            ...state, 
            loading: false, 
            hot: action.payload.hot, 
            dedicated: action.payload.dedicated, 
            enclosed: action.payload.enclosed,
            hotPackages: action.payload.hotPackages,
            enclosedPackages: action.payload.enclosedPackages,
            dedicatedPackages: action.payload.dedicatedPackages,
        }
    case ADD_WORKSPACE_SUCCESS:
        return {...state, loading: false, added: true}
    case REMOVE_WORKSPACE_SUCCESS:
        return {...state, added: false}
    case UPLOAD_IMAGE_REQUESTED:
        return {...state, loading: true}
    case UPLOAD_IMAGE_ERROR:
        return {...state, loading: false, error: true, errorMessage: action.error}
    case UPLOAD_IMAGE_SUCCESS:
        return {...state, loading: false}
    default:
      return state
  }
}
