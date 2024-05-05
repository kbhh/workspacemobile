import { LOCATION_REQUESTED, LOCATION_SUCCESS, LOCATION_ERROR  } from '../actionTypes';
import axios from '../interceptor';
import { storeItem } from '../storage';


const locationRequested = () => ({
    type: LOCATION_REQUESTED,
})

const responseSuccess = (locations) => ({
    type: LOCATION_SUCCESS,
    payload: {locations}
})

const responseError = (message) => ({
    type: LOCATION_ERROR,
    payload: {message}
})

export const fetchLocations = () => {
    console.log('locations')
    return dispatch => {
        dispatch(locationRequested());
        axios.get('Locations?filter[include]=curator')
            .then(response => {
                console.log('> locations response')
                dispatch(responseSuccess(response))
                storeItem('locations', response);
            })
            .catch(error => {
                console.log('error', error)
                dispatch(responseError(error))
            })
    }
}