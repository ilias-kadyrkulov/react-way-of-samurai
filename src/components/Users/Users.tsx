import React from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import { FilterType } from '../../redux/users-reducer'

type PropsType = {
    users: Array<UserType>
    followingInProgress: Array<number>
    currentPageNumber: number
    totalUsersCount: number
    pageSize: number

    onFilterChanged: (filter: FilterType) => void
    onPageChanged: (pageNumber: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}

const Users: React.FC<PropsType> = ({
    users,
    currentPageNumber,
    totalUsersCount,
    pageSize,
    onPageChanged,
    followingInProgress,
    unfollow,
    follow,
    ...props
}) => {
    return (
        <>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />
            <Paginator
                currentPageNumber={currentPageNumber}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged}
            />
            <div>
                {users.map((u) => (
                    <User
                        user={u}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                        key={u.id}
                    />
                ))}
            </div>
        </>
    )
}

export default Users
