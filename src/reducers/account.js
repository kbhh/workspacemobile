import { PROFILE_REQUESTED, PROFILE_SUCCESS, PROFILE_ERROR } from '../actionTypes';

const initialState = {
    "loading" : false,
    "error": false,
    "errorMessage": "",
    "subscription": {
        "event": [],
        "workspace": [],
        "otherServices": []
    },
    "blueFace": {
        "posts": [],
        "comments": []
    },
    "activation": {
        "isActivated": false,
        "activationType": null,
        "activationCode": null
    },
    "profileImages": [],
    "revoked": false,
    "role": "subscriber",
    "helpDesk": [],
    "_id": null,
    "firstName": null,
    "lastName": null,
    "email": null,
    "phone": null,
    "userName": null,
    "__v": 0,
    "company": null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case PROFILE_REQUESTED:
      return {...state, loading: true}
    case PROFILE_SUCCESS:
        return {...state, ...action.payload.user, loading: false }
    case PROFILE_ERROR:
        return {...state, loading: false, error: true}
    default:
      return state
  }
}
