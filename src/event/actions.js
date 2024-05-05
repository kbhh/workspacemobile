import { 
    EVENT_REQUESTED, EVENT_SUCCESS, EVENT_ERROR, ADD_EVENT_REQUESTED,
    ADD_EVENT_SUCCESS, REMOVE_EVENT_SUCCESS, FETCH_EVENT_PACKAGE_REQUESTED, FETCH_EVENT_PACKAGE_SUCCESS, FETCH_EVENT_PACKAGE_ERROR 
} from '../actionTypes';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';


const eventRequested = () => ({
    type: EVENT_REQUESTED,
})

const responseSuccess = (publicEvent, privateEvent) => ({
    type: EVENT_SUCCESS,
    payload: {publicEvent, privateEvent}
})

const responseError = (message) => ({
    type: EVENT_ERROR,
    payload: {message}
})

const addRequested = () => ({
    type: ADD_EVENT_REQUESTED
})

const addSuccess = () => ({
    type: ADD_EVENT_SUCCESS
})

const removeSuccessMessage = () => ({
    type: REMOVE_EVENT_SUCCESS
})

export const fetchEvent = () => {
    return dispatch => {
        dispatch(eventRequested());
        axios.get('/subscription_service/event')
            .then(response => {
                let publicEvent = response.docs.map((item)=>{
                    item.start = dayjs(item.start).format('MMM, DD, YYYY @ HH:mm')
                    item.end = dayjs(item.end).format('MMM, DD, YYYY @ HH:mm')
                    return item
                })
                let privateEvent = [];
                retrieveItem('userId').then((_id)=>{
                    if(_id !== undefined || _id !== null){
                        privateEvent = publicEvent.filter(event => event.userId === _id);
                    }
                    publicEvent = publicEvent.filter(event => event.category === 'Public' || event.category === 'public' );
                    dispatch(responseSuccess(publicEvent, privateEvent))
                    storeItem('public_event', publicEvent);
                    storeItem('private_event', privateEvent);
                    console.log(response)
                    console.log(publicEvent)
                })
                
            })
            .catch(error => {
                console.log('error', error)
                dispatch(responseError(error))
            })
    }
}

export const addEvent = (event) => {
    console.log(event);
    return dispatch => {
        dispatch(addRequested());
        retrieveItem('userId').then((_id)=>{
            if(_id !== undefined || _id !== null){
                axios.post('/subscription_service/event', {...event, userId:_id})
                .then(response => {
                    dispatch(addSuccess())
                    setTimeout(() => { 
                        dispatch(removeSuccessMessage());
                        StackActions.reset({
                            index: 0, 
                            actions: [NavigationService.navigate('Event')]
                        });
                        dispatch(fetchEvent())
                     }, 2500);
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(responseError(error))
                })
            }
        })
    }
}

export const fetchPackages = () => {
    return dispatch => {
        dispatch({
            type: FETCH_EVENT_PACKAGE_REQUESTED,
        })
        console.log('>>>>>> fetching packages')
        axios.get('/subscription_service/service?isOccupied=false&&type=Event')
            .then(response => {
                dispatch({
                    type: FETCH_EVENT_PACKAGE_SUCCESS,
                    payload: {
                        packages: response.docs
                    }
                })
                console.log('>>>>>> fetching packages success', response.docs)
            })
            .catch(error => {
                dispatch({
                    type: FETCH_EVENT_PACKAGE_ERROR,
                    error: error
                })

                console.log('>>>>>> fetching packages error', error)
            })
    }
}