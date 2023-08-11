import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    profileUpdateStatus: false as boolean,
    status: ''
}
export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action: any): InitialStateType => {

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
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case SET_PROFILE_UPDATE_STATUS: {
            return { ...state, profileUpdateStatus: action.profileStatus }
        }
        default:
            return state;
    }
}


type AddPostCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostCreator = (newPostText: string): AddPostCreatorActionType => ({ type: 'ADD_POST', newPostText })
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: 'SET_USER_PROFILE', profile })
type SetStatusActionType = {
    type: typeof SET_STATUS, 
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: 'SET_STATUS', status })
type DeletePostActionType = {
    type: typeof DELETE_POST, 
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: 'DELETE_POST', postId })
type SetPhotosSuccessActionType = {
    type: typeof SET_PHOTOS_SUCCESS, 
    photos: PhotosType
}
export const setPhotosSuccess = (photos: PhotosType): SetPhotosSuccessActionType => ({ type: 'SET_PHOTOS_SUCCESS', photos })
type SetProfileUpdateStatusActionType = {
    type: typeof SET_PROFILE_UPDATE_STATUS, 
    profileStatus: boolean
}
export const setProfileUpdateStatus = (profileStatus: boolean): SetProfileUpdateStatusActionType => ({ type: 'SET_PROFILE_UPDATE_STATUS', profileStatus })


export const getProfileId = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfileId(userId)
    dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhotosSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(setProfileUpdateStatus(true))
        dispatch(getProfileId(userId))
    } else {
        dispatch(stopSubmit('editProfile', { "contacts": { "facebook": response.data.messages[0] } }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;