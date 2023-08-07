import React from 'react'
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({ users, currentPage, totalUsersCount, pageSize, onPageChanged, followingInProgress, unfollow, follow, ...props }) => {
    return (
        <>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
            <div>
                {users.map(u => <User user={u} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} key={u.id} />)}
            </div>
        </>
    )
}

export default Users