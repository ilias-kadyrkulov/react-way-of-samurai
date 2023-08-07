import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how r u?', likesCount: 11 },
        { id: 2, message: 'Not bad.', likesCount: 19 },
        { id: 3, message: 'It\'s my first post.', likesCount: 25 },
    ],
    profile: null,
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
        // stateCopy.posts = [...state.posts];
        // stateCopy.posts.push(newPost);
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        default:
            return state;
    }
}


export const addPostCreator = (newPostText) => ({ type: 'ADD_POST', newPostText })
export const setUserProfile = (profile) => ({ type: 'SET_USER_PROFILE', profile })
export const setStatus = (status) => ({ type: 'SET_STATUS', status })
export const deletePost = (postId) => ({ type: 'DELETE_POST', postId })

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

export default profileReducer;