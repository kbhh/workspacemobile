import { 
    SUPPORT_REQUESTED, SUPPORT_SUCCESS, SUPPORT_ERROR,
    ADD_SUPPORT_REQUESTED, ADD_SUPPORT_SUCCESS, ADD_SUPPORT_ERROR,
    GET_TICKET_DETAIL_ERROR, GET_TICKET_DETAIL_REQUESTED, GET_TICKET_DETAIL_SUCCESS,
    ADD_SUPPORT_FEEDBACK_ERROR, ADD_SUPPORT_FEEDBACK_REQUESTED, ADD_SUPPORT_FEEDBACK_SUCCESS,
} from '../actionTypes';
import { StackActions } from 'react-navigation';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage';
import NavigationService from '../NavigationService';

const goToSupport = () => {
    NavigationService.navigate('Support');
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('Support')]
    });
}

const ticketsRequested = () => ({
    type: SUPPORT_REQUESTED,
})

const responseSuccess = (tickets) => ({
    type: SUPPORT_SUCCESS,
    payload: {tickets}
})

const responseError = (message) => ({
    type: SUPPORT_ERROR,
    payload: {message}
})

export const fetchTickets = () => {
    return dispatch => {
        dispatch(ticketsRequested());
            axios.get(`Accounts/me/tickets?filter[include]=messages&filter[order]=createdAt DESC`)
                .then(response => {
                    console.log(response, '================== tickets =====================')
                    dispatch(responseSuccess(response))
                    storeItem('tickets', response);
                    
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(responseError(error))
                })
            }
}

const addSupportRequested = (data) => ({
    type: ADD_SUPPORT_REQUESTED,
    payload: {
        data
    }
})

const addSupportSuccess = (data) => ({
    type: ADD_SUPPORT_SUCCESS,
    payload: {
        data
    }
})

const addSupportError = (error) => ({
    type: ADD_SUPPORT_ERROR,
    error: error
})

export const addSupport = (data) => {
    return dispatch => {
        dispatch(addSupportRequested(data))
                axios.post(`HelpdeskTickets`, data)
                    .then(response => {
                        console.log('added ticket', response)
                        dispatch(addSupportSuccess(response))
                        dispatch(fetchTickets())
                        goToSupport()
                    })
                    .catch(error => {
                        console.log('error', error)
                        dispatch(addSupportError(error))
                    })
    }
}

export const getTicketDetail = (id) => {
    return dispatch => {
        dispatch({
            type: GET_TICKET_DETAIL_REQUESTED,
            ticketId: id
        })
        axios.get(`Accounts/me/tickets/${id}`)
            .then(response => {
                dispatch({
                    type: GET_TICKET_DETAIL_SUCCESS,
                    payload: {
                        ticket: response
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_TICKET_DETAIL_ERROR,
                    error: error
                })
            })
    }
}

export const addSupportFeedback = (data, ticket, cb) => {
    return dispatch => {
        dispatch({
            type: ADD_SUPPORT_FEEDBACK_REQUESTED,
            data: data,
            ticket: ticket
        })

        let payload = {...data, ticketId: ticket.id, from: ticket.userId, title: '.....'}
        console.log(payload, '.....')
        axios.post(`HelpdeskTicketMessages`, payload)
            .then(response => {
                console.log(response, 'response===============')
                cb(response)

                dispatch({
                    type: ADD_SUPPORT_FEEDBACK_SUCCESS,
                    payload: {
                        message: response
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ADD_SUPPORT_FEEDBACK_ERROR,
                    error: error
                })
            })
    }
}