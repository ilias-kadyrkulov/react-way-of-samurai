import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjInArray } from "../utils/helpers/object-helper";
import { InferActionsTypes } from "./redux-store";


let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: true }) // оптимизировали дублирование кода вспомогательной функцией, которая помогает иммутабельно изменить объект в массиве
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: false })
            }
        case "SET_USERS": {
            return { ...state, users: action.users }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPageNumber: action.currentPageNumber }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress:
                    action.isFetching ? [...state.followingInProgress, action.userId] // 
                        : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

// function inferLiteralFromString<T extends string>(arg: T): T {
//     return arg
// }

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPageNumber: number) => ({ type: 'SET_CURRENT_PAGE', currentPageNumber } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), actions.followSuccess)
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), actions.unfollowSuccess)
}

export default usersReducer;