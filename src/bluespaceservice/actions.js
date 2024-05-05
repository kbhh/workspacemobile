import { SERVICES_REQUESTED, SERVICES_SUCCESS, SERVICES_ERROR, SERVICES_CATEGORY } from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';


const servicesRequested = () => ({
    type: SERVICES_REQUESTED,
})

const responseSuccess = (services) => ({
    type: SERVICES_SUCCESS,
    payload: {services}
})

const responseError = (message) => ({
    type: SERVICES_ERROR,
    payload: {message}
})

const categoryList = (categories) => ({
    type: SERVICES_CATEGORY,
    payload: {categories}
})

export const fetchServices = () => {
    return dispatch => {
        dispatch(servicesRequested());
        axios.get(`Accounts/me/addonBookings?filter[include]=addons&filter[include]=addonQuantities&filter[order]=createdAt DESC`)
        .then(response => {
            console.log('> services', response)
            dispatch(responseSuccess(response))
            storeItem('response', response);
        })
        .catch(error => {
            console.log('error', error)
            dispatch(responseError(error))
        })
    }
}