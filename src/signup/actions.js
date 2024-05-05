import {SIGNUP_REQUESTED, SIGNUP_SUCCESS, SIGNUP_ERROR, NEXT_SCREEN} from '../actionTypes';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';
import axios from '../interceptor';
// import { URL } from '../interceptor'
// import LModel from '../apiService';

const signupRequest = () => ({
    type: SIGNUP_REQUESTED,
})

const signupSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: {user}
})

const signupError = () => ({
    type: SIGNUP_ERROR,
})

const nextScreen = (firstName, lastName, phone, birthDate) => ({
    type: NEXT_SCREEN,
    payload: {firstName, lastName, phone, birthDate}
})

const gotoNext = (fname, lname, phone, birthDate) => {
    return dispatch => {
        dispatch(nextScreen(fname, lname, phone, birthDate))
        NavigationService.navigate('Signup2');
    }
}

const signupProcessor = (user) => {
    return dispatch => {
        dispatch(signupRequest())
        axios.post('Accounts', user)
            .then(data => {
                console.log(data)
                dispatch(signupSuccess(data));
                setTimeout(() => { 
                    NavigationService.navigate('Login');
                 }, 500);
            })
            .catch(error => {
                console.log('error', error)
                dispatch(signupError())
            })
    }
}


export { gotoNext, signupProcessor };