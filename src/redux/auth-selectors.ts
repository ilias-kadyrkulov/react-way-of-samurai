import { RootState } from './redux-store'

export const selectIsAuth = (state: RootState) => {
    return state.auth.isAuth
}
export const selectLogin = (state: RootState) => {
    return state.auth.login
}