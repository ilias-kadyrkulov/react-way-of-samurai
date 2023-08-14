import React from 'react'
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


type MapStatePropsType = {
    currentPageNumber: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
    getUsers: (currentPageNumber: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPageNumber, pageSize } = this.props
        this.props.getUsers(currentPageNumber, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {

        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            {
                !this.props.isFetching ? <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPageNumber={this.props.currentPageNumber}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                /> : null
            }
        </>
    }
}

let mapStateToProps = (state: RootState): MapStatePropsType => ({
    currentPageNumber: getCurrentPageNumber(state),
    pageSize: getPageSize(state),
    isFetching: getIsFetching(state),
    totalUsersCount: getTotalUsersCount(state),
    users: getUsers(state),
    followingInProgress: getFollowingInProgress(state)
})

// export default withAuthRedirect(connect(mapStateToProps, { // hoc-hell
//     follow, unfollow, setCurrentPage, getUsers
// })(UsersContainer))

export default compose(
    // <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect(
        mapStateToProps,
        { follow, unfollow, getUsers: requestUsers })
    // withAuthRedirect
)(UsersContainer)