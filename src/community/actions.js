import { COMMUNITY_REQUESTED, COMMUNITY_SUCCESS, COMMUNITY_ERROR } from '../actionTypes';
import axios from '../interceptor';
import { storeItem } from '../storage';


const communityRequested = () => ({
    type: COMMUNITY_REQUESTED,
})

const responseSuccess = (members) => ({
    type: COMMUNITY_SUCCESS,
    payload: {members}
})

const responseError = (message) => ({
    type: COMMUNITY_ERROR,
    payload: {message}
})

export const fetchCommunity = () => {
    return dispatch => {
        dispatch(communityRequested());
        axios.get('Companies?filter[include]=members')
            .then(response => {
                console.log('members >>>>>>', response)
                dispatch(responseSuccess(response));
                storeItem('members', response);
                console.log(response.docs)
            })
            .catch(error => {
                console.log('error', error)
                dispatch(responseError(error))
            })
    }
}