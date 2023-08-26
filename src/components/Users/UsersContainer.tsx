import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    FilterType,
    follow,
    requestUsers,
    unfollow,
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'
import { UserType } from '../../types/types'
import { RootState } from '../../redux/redux-store'
import {
    getCurrentPageNumber,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from '../../redux/users-selectors'

type MapPropsType = {
    currentPageNumber: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type DispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    getUsers: (
        currentPageNumber: number,
        pageSize: number,
        filter: FilterType
    ) => void
}

type PropsType = {
    pageTitle: string
}

const UsersContainer: FC<MapPropsType & DispatchPropsType & PropsType> = (
    props
) => {
    useEffect(() => {
        const { currentPageNumber, pageSize, filter } = props
        props.getUsers(currentPageNumber, pageSize, filter)
    }, [])

    const onPageChanged = (pageNumber: number) => {
        const { pageSize, filter } = props
        props.getUsers(pageNumber, pageSize, filter)
    }

    const onFilterChanged = (filter: FilterType) => {
        const { pageSize } = props
        props.getUsers(1, pageSize, filter) //NOTE - в filter приходят term и friend, и запрос идет уже с ними; term м.б. '', а сервер проигнорирует friend, если будет null
    }

    return (
        <>
            <h2 style={{ marginLeft: '10px' }}>{props.pageTitle}</h2>
            {props.isFetching ? <Preloader /> : null}
            {!props.isFetching ? (
                <Users
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPageNumber={props.currentPageNumber}
                    onPageChanged={onPageChanged}
                    onFilterChanged={onFilterChanged}
                    users={props.users}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    followingInProgress={props.followingInProgress}
                />
            ) : null}
        </>
    )
}

let mapStateToProps = (state: RootState): MapPropsType => ({
    currentPageNumber: getCurrentPageNumber(state),
    pageSize: getPageSize(state),
    isFetching: getIsFetching(state),
    totalUsersCount: getTotalUsersCount(state),
    users: getUsers(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

export default compose(
    connect<MapPropsType, DispatchPropsType, PropsType, RootState>(
        mapStateToProps,
        { follow, unfollow, getUsers: requestUsers }
    )
    // withAuthRedirect
)(UsersContainer)
