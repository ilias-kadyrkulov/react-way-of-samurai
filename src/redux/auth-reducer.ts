import { stopSubmit } from "redux-form";
import { ResultCodeForCaptcha, ResultCodesEnum, authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState


const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.payload }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

type SetAuthUserDataPayloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: 'SET_USER_DATA', payload: { id, email, login, isAuth }
})

// type GetCaptChaUrlSuccessPayloadType = {
//     captchaUrl: string
// }
type GetCaptChaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptChaUrlSuccessActionType => ({
    type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
})

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()
    
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;