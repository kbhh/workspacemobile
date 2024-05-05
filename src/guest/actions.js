import {
    GUEST_REQUESTED, GUEST_SUCCESS, GUEST_ERROR,
    ADD_MEETUP_SESSION_ERROR, ADD_MEETUP_SESSION_REQUEST, ADD_MEETUP_SESSION_SUCCESS, 
    MEETUP_SESSION_REQUESTED, MEETUP_SESSION_ERROR, MEETUP_SESSION_SUCCESS, 
    ADD_GUEST_REQUESTED, ADD_GUEST_ERROR, ADD_GUEST_SUCCESS,
    EDIT_GUEST_SUCCESS, EDIT_GUEST_ERROR, EDIT_GUEST_REQUESTED, DELETE_GUEST_REQUESTED, SELECT_MEETUP_SESSION, EDIT_MEETUP_SESSION_REQUESTED, EDIT_MEETUP_SESSION_ERROR, DELETE_MEETUP_SESSION_REQUESTED, DELETE_MEETUP_SESSION_SUCCESS, DELETE_MEETUP_SESSION_ERROR, DELETE_GUEST_SUCCESS, DELETE_GUEST_ERROR
} from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';
import NavigationService from '../NavigationService';
import { StackActions } from 'react-navigation';


const meetupSessionsRequested = () => ({
    type: MEETUP_SESSION_REQUESTED,
})

const meetupSessionsSuccess = (meetupSessions) => ({
    type: MEETUP_SESSION_SUCCESS,
    payload: {meetupSessions}
})

const meetupSessionsError = (message) => ({
    type: MEETUP_SESSION_ERROR,
    payload: {message}
})

export const fetchMeetupSessions = () => {
    return dispatch => {
        dispatch(meetupSessionsRequested());
        axios.get(`Accounts/me/meetupSessions?filter[include]=user&filter[include]=guests&filter[order]=createdAt DESC`)
        .then(response => {
            // console.log(response.docs, '***** guests ****')
            let meetupSessions = response.map((session)=>{
                session.date = dayjs(session.start).format('MMM DD, YYYY @ hh:mm A')
                session.time = dayjs(session.end).format('MMM DD, YYYY @ hh:mm A')
                // console.log(session)
                return session
            })
            dispatch(meetupSessionsSuccess(meetupSessions))
            storeItem('meetupSessions', meetupSessions);
        })
        .catch(error => {
            console.log('error', error)
            dispatch(meetupSessionsError(error))
        })
    }
}

const goToSingleSession = (session) => {
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('GuestDetail', {meetupSession: session})]
    });
}

const goToGuests = () => {
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('Guest')]
    });
}

export const addMeetupSession = (data) => {
    return dispatch => {
        dispatch({
            type: ADD_MEETUP_SESSION_REQUEST,
            payload: {data}
        })
        axios.post('MeetupSessions', data)
            .then(response => {
                dispatch({
                    type: ADD_MEETUP_SESSION_SUCCESS,
                    payload: {
                        meetupSession: response
                    }
                })
                dispatch(fetchMeetupSessions())
                goToSingleSession(response)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: ADD_MEETUP_SESSION_ERROR,
                    error: error
                })
            })
    }
}

export const addGuest = (data, session, moreCallback) => {
    return dispatch => {
        dispatch({
            type: ADD_GUEST_REQUESTED,
            payload: {session, data}
        })
        // console.log(payload, '............................')
        axios.post(`MeetupSessions/${session.id}/guests`, {...data, type: 'meetupSession'})
            .then(response => {
                dispatch({
                    type: ADD_GUEST_SUCCESS,
                    payload: {response}
                })
                if(moreCallback){
                    moreCallback()
                }
                else{
                    // goToSingleSession(session)
                    goToGuests()
                    dispatch(fetchMeetupSessions())
                }
            })
            .catch(error => {
                console.log('error: ', error)
                dispatch({
                    type: ADD_GUEST_ERROR,
                    error: error
                })
            })
    }
}

export const editGuest = (session, data, onSuccess) => {
    return dispatch => {
        console.log('editing guest.....')
        dispatch({
            type: EDIT_GUEST_REQUESTED,
            payload: {
                id: session._id,
                data: data
            }
        })
        let payload = {...data}
        axios.put('MeetupSessions', payload)
            .then(response => {
                console.log('editing success ....', response)
                dispatch({
                    type: EDIT_GUEST_SUCCESS,
                    payload: {response}
                })

                if(response.ok){
                    goToGuests()
                }
            })
            .catch(error => {
                dispatch({
                    type: EDIT_GUEST_ERROR,
                    error: error
                })
            })
    }
}

export const deleteGuest = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_GUEST_REQUESTED,
            data: id
        })
        axios.delete(`MeetupSessions/${id}`).then(response => {
            dispatch({
                type: DELETE_GUEST_SUCCESS,
            })
        }).catch(error=> {
            dispatch({
                type: DELETE_GUEST_ERROR,
                error: error
            })
        })
    }
}

export const selectMeetupSession = (session) => ({
    type: SELECT_MEETUP_SESSION,
    payload: {meetupSession: session}
})

export const editMeetupSession = (session, data) => {
    return dispatch => {
        dispatch({
            type: EDIT_MEETUP_SESSION_REQUESTED,
            payload: {meetupSession: session, data: data}
        })
        let payload = {...data, _id: session._id}
        console.log('requesting meetup session update')
        axios.patch(`MeetupSessions/${session.id}`, payload)
            .then(response => {
                console.log('success edit meetup session', response)
                dispatch({
                    type: EDIT_MEETUP_SESSION_SUCCESS,
                    payload: {
                        response
                    }
                })
                goToSingleSession(session)
            })
            .catch(error => {
                console.log('error updating meetup session')
                dispatch({
                    type: EDIT_MEETUP_SESSION_ERROR,
                    error: error
                })
            })
            // temp
            goToSingleSession(session)

    }
}

export const deleteMeetupSession = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_MEETUP_SESSION_REQUESTED,
            payload: {meetupSession: id}
        })
        axios.delete(`MeetupSessions/${id}`)
            .then(response => {
                dispatch({
                    type: DELETE_MEETUP_SESSION_SUCCESS,
                    payload: {data: response}
                })
                dispatch(fetchMeetupSessions())
            })
            .catch(error => {
                dispatch({
                    type: DELETE_MEETUP_SESSION_ERROR,
                    error: error
                })
            })
    }
}