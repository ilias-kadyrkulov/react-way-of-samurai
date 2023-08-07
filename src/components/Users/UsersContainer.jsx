import React from 'react'
import { connect } from 'react-redux'
import {
    follow,
    requestUsers,
    setCurrentPage,
    unfollow
}
    from '../../redux/users-reducer'
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            {
                !this.props.isFetching ? <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
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

let mapStateToProps = (state) => ({
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
})

// export default withAuthRedirect(connect(mapStateToProps, { // hoc-hell
//     follow, unfollow, setCurrentPage, getUsers
// })(UsersContainer))

export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, getUsers: requestUsers }),
    // withAuthRedirect
)(UsersContainer)