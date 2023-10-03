import React, { FC, useEffect } from 'react'
import Profile from './Profile'
import { getProfileId, getUserStatus } from '../../redux/profile-reducer'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const ProfilePage: FC = (props) => {
    let { userId } = useParams<{ userId?: string }>()

    const authorizedUserId = useAppSelector((state) => state.auth.id)
    const isAuth = useAppSelector((state) => state.auth.isAuth)

    const dispatch = useAppDispatch()

    let navigate = useNavigate()

    useEffect(() => {
        if (!userId) {
            userId = authorizedUserId + ''
            if (!userId) {
                navigate('/login')
            }
        }

        dispatch(getProfileId(+userId))
        dispatch(getUserStatus(+userId))
    }, [userId])

    if(!isAuth) return <Navigate to='/react-way-of-samurai/login' />

    return <Profile isOwner={!userId} />
}

export default ProfilePage