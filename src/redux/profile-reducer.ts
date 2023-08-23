import { FormAction, stopSubmit } from "redux-form"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { profileAPI } from "../api/profile-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how r u?', likesCount: 11 },
        { id: 2, message: 'Not bad.', likesCount: 19 },
        { id: 3, message: 'It\'s my first post.', likesCount: 25 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    profileUpdateStatus: false,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "sn/profile/add_post":
            let newPost = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case "sn/profile/set_user_profile": {
            return { ...state, profile: action.profile }
        }
        case "sn/profile/set_status": {
            return { ...state, status: action.status }
        }
        case "sn/profile/delete_post": {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        case "sn/profile/set_photos_success": {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case "sn/profile/set_profile_update_status": {
            return { ...state, profileUpdateStatus: action.profileStatus }
        }
        default:
            return state;
    }
}

export const actions = {
    addPost: (newPostText: string) => ({ type: 'sn/profile/add_post', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'sn/profile/set_user_profile', profile } as const),
    setStatus: (status: string) => ({ type: 'sn/profile/set_status', status } as const),
    deletePost: (postId: number) => ({ type: 'sn/profile/delete_post', postId } as const),
    setPhotosSuccess: (photos: PhotosType) => ({ type: 'sn/profile/set_photos_success', photos } as const),
    setProfileUpdateStatus: (profileStatus: boolean) => ({ type: 'sn/profile/set_profile_update_status', profileStatus } as const)
}

export const getProfileId = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileId(userId)
    dispatch(actions.setUserProfile(data))
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.setPhotosSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(actions.setProfileUpdateStatus(true))
        if (userId !== null) {
            dispatch(getProfileId(userId))
        } else {
            throw new Error('userId can not be null')
        }
    } else {
        dispatch(stopSubmit('editProfile', { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>