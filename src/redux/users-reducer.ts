import { Dispatch } from 'redux'
import { usersAPI } from '../api/users-api'
import { UserType } from '../types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { updateObjInArray } from '../utils/helpers/object-helper'
import { APIResponseType } from '../api/api'

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {                       // NOTE - filter свойство 
      term: '',
      friend: null as null | boolean
    }
}

const usersReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'sn/users/follow':
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {
                    followed: true,
                }), // оптимизировали дублирование кода вспомогательной функцией, которая помогает иммутабельно изменить объект в массиве
            }
        case 'sn/users/unfollow':
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            }
        case 'sn/users/set_users': {
            return { ...state, users: action.users }
        }
        case 'sn/users/set_current_page': {
            return { ...state, currentPageNumber: action.currentPageNumber }
        }
        case 'sn/users/set_filter': {
            return { ...state, filter: action.payload }
        }
        case 'sn/users/set_total_users_count': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case 'sn/users/toggle_is_fetching': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'sn/users/toggle_is_following_progress': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] //
                    : state.followingInProgress.filter(
                          (id) => id != action.userId
                      ),
            }
        }
        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) =>
        ({ type: 'sn/users/follow', userId } as const),
    unfollowSuccess: (userId: number) =>
        ({ type: 'sn/users/unfollow', userId } as const),
    setUsers: (users: Array<UserType>) =>
        ({ type: 'sn/users/set_users', users } as const),
    setCurrentPage: (currentPageNumber: number) =>
        ({ type: 'sn/users/set_current_page', currentPageNumber } as const),
    setFilter: (filter: FilterType) =>
        ({ type: 'sn/users/set_filter', payload: filter } as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({ type: 'sn/users/set_total_users_count', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({ type: 'sn/users/toggle_is_fetching', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({
            type: 'sn/users/toggle_is_following_progress',
            isFetching,
            userId,
        } as const),
}

export const requestUsers = (
    page: number,
    pageSize: number,
    filter: FilterType
): ThunkType => { //NOTE - используя 2 способ больше нет нужны thunk'e принимать getState, и () dispatch больше не нужно типизировать, все типизируется в ThunkAction: <возвращается тип рез-та (), в нашем случае Promise<резолвится void'ом>, дальше передается State store'a, дальше Extra аргументы (возможно замена использования замыкания), и Action
    return async (dispatch) => { 
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter)) //NOTE - сетается filter
        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend) // куда передаются типы каждого action'a в {} action
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (
        userId: number
    ) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow =
    (userId: number): ThunkType =>
    async (dispatch) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.followUser.bind(usersAPI),
            actions.followSuccess
        )
    }
export const unfollow =
    (userId: number): ThunkType =>
    async (dispatch) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.unfollowUser.bind(usersAPI),
            actions.unfollowSuccess
        )
    }

export default usersReducer

// function inferLiteralFromString<T extends string>(arg: T): T { // constraint, таким образом, на входе аргумент только типа string
//     return arg
// }
// type GetRootState = () => RootState          // 1 из способов типизации Thun'ok
// type DispatchType = Dispatch<ActionsTypes>
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ThunkType = BaseThunkType<ActionsTypes> // 2 способ - ThunkAction<ReturnType, State, ExtraThunkArg, BasicAction extends Action>
type ActionsTypes = InferActionsTypes<typeof actions>

const FOLLOW = 'sn/users/follow'
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
const UNFOLLOW = 'sn/users/unfollow'
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
