import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTOS_SUCCESS = 'SET_PHOTOS_SUCCESS';
const SET_PROFILE_UPDATE_STATUS = 'SET_PROFILE_UPDATE_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how r u?', likesCount: 11 },
        { id: 2, message: 'Not bad.', likesCount: 19 },
        { id: 3, message: 'It\'s my first post.', likesCount: 25 },
    ],
    profile: null,
    profileUpdateStatus: false,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        case SET_PHOTOS_SUCCESS: {
            return { ...state, profile: {...state.profile, photos: action.photos} }
        }
        case SET_PROFILE_UPDATE_STATUS: {
            return { ...state, profileUpdateStatus: action.profileStatus }
        }
        default:
            return state;
    }
}


export const addPostCreator = (newPostText) => ({ type: 'ADD_POST', newPostText })
export const setUserProfile = (profile) => ({ type: 'SET_USER_PROFILE', profile })
export const setStatus = (status) => ({ type: 'SET_STATUS', status })
export const deletePost = (postId) => ({ type: 'DELETE_POST', postId })
export const setPhotosSuccess = (photos) => ({ type: 'SET_PHOTOS_SUCCESS', photos })
export const setProfileUpdateStatus = (profileStatus) => ({ type: 'SET_PROFILE_UPDATE_STATUS', profileStatus })

export const getProfileId = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfileId(userId)
    dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhotosSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile)
    if(response.data.resultCode === 0) {
        dispatch(setProfileUpdateStatus(true))
        dispatch(getProfileId(userId))
    } else {
        dispatch(stopSubmit('editProfile', {"contacts": {"facebook": response.data.messages[0]}} ))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;