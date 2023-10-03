import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginForm} from './LoginForm/LoginForm'
import { useAppSelector } from '../../hooks/redux'

export const LoginPage: FC = (props) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    if (isAuth) return <Navigate to="/react-way-of-samurai/profile" />

    return (
        <>
            <h1>Login</h1>
            <LoginForm />
        </>
    )
}