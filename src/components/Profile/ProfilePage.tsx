import React, { FC, useEffect } from 'react'
import Profile from './Profile'
import {
    getProfileId,
    getUserStatus
} from '../../redux/profile-reducer'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

export const ProfilePage: FC = (props) => {
    let { userId } = useParams<{ userId?: string }>()

    const authorizedUserId = useAppSelector(state => state.auth.id)

    const dispatch = useAppDispatch()

    const getProfileAndStatus = () => {
        dispatch(getProfileId(+userId))
        dispatch(getUserStatus(+userId))
    }

    let navigate = useNavigate()

    useEffect(() => {
        if (!userId) {
            userId = authorizedUserId + ''
            if (!userId) {
                navigate('/login')
            }
        }

        if (!userId) {
            console.error(
                'ID has to exist in URI params or in state (authorizedId)'
            )
        } else {
            getProfileAndStatus()
        }
    }, [userId])

    return <Profile isOwner={!userId} />
}