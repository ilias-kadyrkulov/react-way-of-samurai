import React, { FC } from 'react'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { getIsFetching } from '../../redux/users-selectors'
import { useAppSelector } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'

type PropsType = {
    pageTitle: string
}

export const UsersPage: FC<PropsType> = (props) => {
    const isFetching = useAppSelector(getIsFetching)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    if(!isAuth) return <Navigate to='/react-way-of-samurai/login' />

    return (
        <>
            <h2 style={{ marginLeft: '10px' }}>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}