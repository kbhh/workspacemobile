import { 
    PROFILE_REQUESTED, PROFILE_SUCCESS, PROFILE_ERROR, 
    BILL_REQUESTED, BILL_SUCCESS, BILL_ERROR, 
    COMPANY_REQUESTED, COMPANY_SUCCESS, COMPANY_ERROR,
    COMPANY_ADDED, COMPANY_ADDED_REMOVE
} from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage';
import dayjs from 'dayjs';
import { AsyncStorage } from 'react-native'


const profileRequested = () => ({
    type: PROFILE_REQUESTED,
})

const profileSuccess = (user) => ({
    type: PROFILE_SUCCESS,
    payload: {user}
})

const profileError = (message) => ({
    type: PROFILE_ERROR,
    payload: {message}
})

const billRequested = () => ({
    type: BILL_REQUESTED,
})

const billSuccess = (billing) => ({
    type: BILL_SUCCESS,
    payload: {billing}
})

const billError = (message) => ({
    type: BILL_ERROR,
    payload: {message}
})

const companyRequested = () => ({
    type: COMPANY_REQUESTED,
})

const companySuccess = (companies) => ({
    type: COMPANY_SUCCESS,
    payload: {companies}
})

const companyError = (message) => ({
    type: COMPANY_ERROR,
    payload: {message}
})

export const fetchProfile = () => {
    return dispatch => {
        dispatch(profileRequested());
        axios.get('Accounts/me')
            .then(response => {
                console.log(response)
                dispatch(profileSuccess(response));
                storeItem('user', response);
            })
            .catch(error => {
                console.log('error', error);
                dispatch(profileError(error));
            })
    }
};

export const fetchBilling = () => {
    return dispatch => {
        dispatch(billRequested());
        retrieveItem('userId').then((_id)=>{
            if(_id !== undefined || _id !== null){
                // axios.get('/subscription_service/bill')
                axios.get('/subscription_service/bill?userId='+ _id)
                .then(response => {
                    let billing = response.docs.map((bill)=>{
                        bill.dueDate = dayjs(bill.dueDate).format('MMM, DD, YYYY @ HH:mm')
                        return bill;
                    });
                    dispatch(billSuccess(billing));
                    storeItem('billing', billing);
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(billError(error))
                })
            }
        })
    }
};

export const fetchCompany = () => {
    return dispatch => {
        dispatch(companyRequested());
        AsyncStorage.getItem('authData', (err, authData) => {
            console.log('> user', JSON.parse(authData))
                axios.get(`CompanyMembers?filter[where][role]=admin&filter[include]=company&filter[where][memberId]=${JSON.parse(authData).userId}`)
                .then(response => {
                    response = response.filter(comp => comp.company)
                    dispatch(companySuccess(response))
                    storeItem('companies', response);
                    console.log(response);
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(companyError(error))
                })
        })
    }
};

export const addCompany = (data) => {
    console.log('add company >>>>>>', data)
    return dispatch => {
        dispatch(companyRequested());
        retrieveItem('userId').then((_id)=>{
            if(_id !== undefined || _id !== null){
                console.log('found user >>>>', _id)
                axios.post('/user_service/company', {...data})
                .then(response => {
                    console.log('successfully added', response)
                    dispatch({ type: COMPANY_ADDED })
                    setTimeout(() => { 
                        dispatch({ type: COMPANY_ADDED_REMOVE })
                        StackActions.reset({
                            index: 0, 
                            actions: [NavigationService.navigate('Company')]
                        });
                     }, 2500);
                    dispatch(fetchCompany())
                })
                .catch(error => {
                    dispatch(responseError(error))
                })
            }
        })
    }
}

export const uploadImage = (data) => {
    return dispatch => {
        dispatch({
            type: UPLOAD_IMAGE_REQUESTED,
            data: data
        })
        axios.post('/image_service/image', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                dispatch({
                    type: UPLOAD_IMAGE_SUCCESS,
                    payload: {image: response}
                })
            })
            .catch(error => {
                console.log(error, 'error uploading................')
                dispatch({
                    type: UPLOAD_IMAGE_ERROR,
                    error: error
                })
            })
    }
}