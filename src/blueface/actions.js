import { BF_REQUESTED, BF_SUCCESS, BF_ERROR, BF_COMMETS, BF_COMMET_ADDED, BF_REMOVE_SUCCESS } from '../actionTypes';
import axios from '../interceptor';
import { storeItem, retrieveItem } from '../storage'
import dayjs from 'dayjs';
import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';

const postsRequested = () => ({
    type: BF_REQUESTED,
})

const responseSuccess = (posts) => ({
    type: BF_SUCCESS,
    payload: {posts}
})

const responseError = (message) => ({
    type: BF_ERROR,
    payload: {message}
})

const responseComments = (comments) => ({
    type: BF_COMMETS,
    payload: {comments}
})

const addSuccess = () => ({
    type: BF_COMMET_ADDED,
})

const removeSuccess = () => ({
    type: BF_REMOVE_SUCCESS,
})

export const fetchPosts = () => {
    return dispatch => {
        dispatch(postsRequested());
        axios.get('CommunityBoards?filter[include]=user&filter[include]=comments&filter[status]=approved&filter[order]=createdAt DESC')
            .then(response => {
                let posts = response.map((post)=>{
                    post.date = dayjs(post.createdAt).format('MMM DD, YYYY @ HH:mm')
                    post.user.name = `${post.user.firstName} ${post.user.lastName}`
                    return post
                })
                dispatch(responseSuccess(posts))
                storeItem('posts', posts);
            })
            .catch(error => {
                dispatch(responseError(error))
            })
    }
}

export const fetchComments = (postId) => {
    return dispatch => {
        dispatch(postsRequested());
        axios.get(`CommunityBoards/${postId}/comments?filter[include]=post&filter[include]=user&filter[order]=createdAt DESC`)
            .then(response => {
                dispatch(responseComments(response));
            })
            .catch(error => {
                console.log('error', error)
                dispatch(responseError(error))
            })
    }
}

export const postComment = (comment) => {
    console.log(comment);
    return dispatch => {
        dispatch(postsRequested())
                axios.post(`CommunityBoardComments`, comment)
                .then(response => {
                    dispatch(addSuccess());
                    dispatch(fetchComments(comment.postId))
                })
                .catch(error => {
                    console.log('error', error)
                    dispatch(responseError(error))
                })
        //     }
        // })
    }
}