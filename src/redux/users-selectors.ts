import { RootState } from './redux-store'

export const getUsers = (state: RootState) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state: RootState) => {
    return state.usersPage.totalUsersCount
}

export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize
}

export const getCurrentPageNumber = (state: RootState) => {
    return state.usersPage.currentPageNumber
}

export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: RootState) => {
    return state.usersPage.followingInProgress
}
export const getUsersFilter = (state: RootState) => { 
    return state.usersPage.filter
}