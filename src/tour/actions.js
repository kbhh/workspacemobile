import { TOUR_REQUESTED, TOUR_SUCCESS, TOUR_ERROR } from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService'

const toursRequested = () => ({
    type: TOUR_REQUESTED,
})

const responseSuccess = (tours) => ({
    type: TOUR_SUCCESS,
    payload: {tours}
})

const responseError = (message) => ({
    type: TOUR_ERROR,
    payload: {message}
})

export const fetchTours = () => {
    return dispatch => {
        dispatch(toursRequested());
        axios.get('Accounts/me/tourRequests?filter[order]=createdAt ASC')
            .then(response => {
                let tours = response.map((tour)=>{
                    tour.begin = dayjs(tour.start).format('MMM DD, YYYY @ HH:mm')
                    tour.end = dayjs(tour.end).format('MMM DD, YYYY @ HH:mm')
                    return tour
                })
                dispatch(responseSuccess(tours))
                storeItem('tours', tours);
            })
            .catch(error => {
                console.log('error', error)
                dispatch(responseError(error))
            })
    }
}

export const addTour = (tour) => {
    console.log('> tour', tour)
    return dispatch => {
        dispatch(toursRequested())
                axios.post('TourRequests', tour)
                    .then(response => {
                        StackActions.reset({
                            index: 0, 
                            actions: [NavigationService.navigate('Tour')]
                        });
                        dispatch(fetchTours())
                    })
                    .catch(error => {
                        console.log(error)
                        dispatch(responseError(error))
                    })
        }
}