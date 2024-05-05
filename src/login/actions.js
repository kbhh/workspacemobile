import { LOGIN_REQUESTED, AUTH_SUCCESS, AUTH_ERROR, RESET_SUCCESS } from '../actionTypes';
import { StackActions } from 'react-navigation';
import { AsyncStorage } from 'react-native'
import NavigationService from '../NavigationService';
import axios from '../interceptor';
import { storeItem, removeItem } from '../storage';

const loginRequest = () => ({
    type: LOGIN_REQUESTED,
})

const authSuccess = (token) => ({
    type: AUTH_SUCCESS,
    payload: {token}
})

const authError = () => ({
    type: AUTH_ERROR,
})

const resetSuccess = (message) => ({
    type: RESET_SUCCESS,
    payload: {message}
})

const goToLogin = () => {
    NavigationService.navigate('Login');
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('Login')]
    });
}

export const authProcessor = (email, password) => {
    return dispatch => {
        dispatch(loginRequest())
        axios.post('Accounts/login', {email, password})
            .then(response => {
                // console.log(response)
                let items = [
                    ['token', response.id],
                    ['authData', JSON.stringify(response)],
                    ['userId', response.userId]
                ]                
                AsyncStorage.multiSet(items, (error) => {
                    if(error) {
                        console.log('> error setting item', error)
                        return;
                    }
                    console.log('> success storing', response.id)
                    StackActions.reset({
                        index: 0, 
                        actions: [NavigationService.navigate('Home')]
                    });
                    console.log('stored data')
                    storeItem('authData', response);
                    storeItem('userId', response.userId);
                    dispatch(authSuccess(response));
                })
                
            })
            .catch(error => {
                console.log('error', error)
                dispatch(authError())
            })
    }
}

export const resetPassword = (email) => {
    return dispatch => {
        dispatch(loginRequest())
        axios.post('/user_service/user/password_recovery', {email})
        .then(response => {
            console.log(response)
            dispatch(resetSuccess(response.message))
            setTimeout(() => { 
                dispatch(goToLogin);
             }, 2500);
        })
        .catch(error => {
            console.log(error)
            dispatch(authError())
        })
    }
}
