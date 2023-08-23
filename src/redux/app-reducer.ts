import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "sn/app/initialized_success": {
            return { ...state, initialized: true }
        }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({ type: 'sn/app/initialized_success' } as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = await dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        })
}

export default appReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>