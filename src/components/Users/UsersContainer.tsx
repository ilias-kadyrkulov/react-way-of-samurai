import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import {
    follow,
    requestUsers,
    unfollow
}
    from '../../redux/users-reducer'
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
    getUsers
} from '../../redux/users-selectors'


type MapPropsType = {
    currentPageNumber: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type DispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    getUsers: (currentPageNumber: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapPropsType & DispatchPropsType & OwnPropsType

const UsersContainer: FC<PropsType> = (props) => {
    useEffect(() => {
        const { currentPageNumber, pageSize } = props
        props.getUsers(currentPageNumber, pageSize)
    }, [])

    const onPageChanged = (pageNumber: number) => {
        const { pageSize } = props
        props.getUsers(pageNumber, pageSize)
    }

    return <>
        <h2>{props.pageTitle}</h2>
        {props.isFetching ? <Preloader /> : null}
        {
            !props.isFetching ? <Users
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
                currentPageNumber={props.currentPageNumber}
                onPageChanged={onPageChanged}
                users={props.users}
                follow={props.follow}
                unfollow={props.unfollow}
                followingInProgress={props.followingInProgress}
            /> : null
        }
    </>
}

let mapStateToProps = (state: RootState): MapPropsType => ({
    currentPageNumber: getCurrentPageNumber(state),
    pageSize: getPageSize(state),
    isFetching: getIsFetching(state),
    totalUsersCount: getTotalUsersCount(state),
    users: getUsers(state),
    followingInProgress: getFollowingInProgress(state)
})

export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapPropsType, DispatchPropsType, OwnPropsType, RootState>(
        mapStateToProps,
        { follow, unfollow, getUsers: requestUsers })
    // withAuthRedirect
)(UsersContainer)