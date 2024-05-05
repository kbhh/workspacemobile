import { 
    WORKSPACE_REQUESTED, WORKSPACE_SUCCESS, WORKSPACE_ERROR, 
    WORKSPACE_CATEGORY, ADD_WORKSPACE_SUCCESS, REMOVE_WORKSPACE_SUCCESS, UPLOAD_IMAGE_REQUESTED, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_ERROR
} from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage';
import dayjs from 'dayjs';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';


const workspaceRequested = () => ({
    type: WORKSPACE_REQUESTED,
})

const responseSuccess = (workspaces) => ({
    type: WORKSPACE_SUCCESS,
    payload: {workspaces}
})

const responseError = (message) => ({
    type: WORKSPACE_ERROR,
    payload: {message}
})

const categoryList = (hot, enclosed, dedicated, hotPackages, enclosedPackages, dedicatedPackages) => ({
    type: WORKSPACE_CATEGORY,
    payload: {hot, enclosed, dedicated, hotPackages, enclosedPackages, dedicatedPackages}
})

const addSuccess = () => ({
    type: ADD_WORKSPACE_SUCCESS
})

const removeSuccessMessage = () => ({
    type: REMOVE_WORKSPACE_SUCCESS
})

export const fetchWorkspace = () => {
    return dispatch => {
        dispatch(workspaceRequested());
            axios.get('Accounts/me/workspaceSubscriptions?filter[include]=service&filter[include]=pricing&filter[order]=createdAt DESC')
                .then(response => {
                    console.log(response.length, 'sub')
                    let workspace = response.map((item)=>{
                        item.start = dayjs(item.startDate).format('MMM, DD, YYYY')
                        item.end = dayjs(item.endDate).format('MMM, DD, YYYY')
                        return item
                    })
                    dispatch(responseSuccess(workspace))
                    storeItem('workspaces', workspace);
                })
                .catch(error => {
                    // if(er)
                    dispatch(responseError(error))
                })
    }
}

export const addWorkspace = (workspace, cb) => {
    return dispatch => {
        dispatch(workspaceRequested());
        console.log('> requesting to add', workspace)
        axios.post('WorkspaceSubscriptions', workspace)
        .then(response => {
            console.log('>>>>>>>>>>>>>>>> success adding workspace')
            dispatch(addSuccess())
            cb(response)
            setTimeout(() => { 
                dispatch(removeSuccessMessage())
                // StackActions.reset({
                //     index: 0, 
                //     actions: [NavigationService.navigate('AddWorkspaceSuccess')]
                // });
                }, 2500);
            dispatch(fetchWorkspace())
        })
        .catch(error => {
            console.log('>>>>>>>>>>>>>> error adding workspace', error)
            dispatch(responseError(error))
        })
            
    }
}

const flatServicePackages = (service) => {
    let packages = []
    service.map(item => {
        return item.packages.map(package_ => {
            package_['serviceId'] = item._id
            packages.push(package_)
            return package_
        })
    })
    // console.log(packages , '=============================================')
    return packages
}

export const fetchAvailable = (branchId) => {
    return dispatch => {
        console.log('> fetching pricing ', branchId)
        axios.get(`SubscriptionServices?filter[include]=pricings&filter[where][locationId]=${branchId}&filter[where][isOccupied]=false`)
            .then(response => {
                // console.log(response)
                response = response.filter(service => service.pricings.length > 0)
                let hot = response.filter(item => item.category === 'hot desk');
                let enclosed = response.filter(item => item.category === 'enclosed');
                let dedicated = response.filter(item => item.category === 'dedicated');
                // console.log(hotPackages, 'hot packages===========================')
                dispatch(categoryList(hot, enclosed, dedicated))
            })
            .catch(error => {
                console.log(error);
                dispatch(responseError(error))
            })
    }
}

export const uploadImage = (data, onSuccess, container) => {
    container = container ? container : 'workspaceSubscription'
    return dispatch => {
        dispatch({
            type: UPLOAD_IMAGE_REQUESTED,
            data: data
        })
        axios.post(`Containers/${container}/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                console.log('image uploaded................................................', response)
                dispatch({
                    type: UPLOAD_IMAGE_SUCCESS,
                    payload: {image: response}
                })
                onSuccess(response)
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