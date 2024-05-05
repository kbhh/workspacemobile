import { NOTIF_REQUESTED, NOTIF_SUCCESS, NOTIF_ERROR } from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';


const notificationsRequested = () => ({
    type: NOTIF_REQUESTED,
})

const responseSuccess = (notifications) => ({
    type: NOTIF_SUCCESS,
    payload: {notifications}
})

const responseError = (message) => ({
    type: NOTIF_ERROR,
    payload: {message}
})

export const fetchNotifications = () => {
    return dispatch => {
        dispatch(notificationsRequested());
        retrieveItem('userId').then((_id)=>{
            if(_id !== undefined || _id !== null){
                axios.get('/notification?userId='+ _id)
                .then(response => {
                    let notifications = response.docs.map((item)=>{
                        item.date = dayjs(item.date).format('MMM, DD, YYYY @ HH:mm')
                        return item
                    })
                    dispatch(responseSuccess(notifications))
                    storeItem('notifications', notifications);
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(responseError(error))
                })
            }
        })
    }
}