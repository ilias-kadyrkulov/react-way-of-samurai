import React, { ComponentType, FC, useEffect } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getProfileId,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { RootState } from '../../redux/redux-store';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileType } from '../../types/types';

type MapPropsType = {
    profile: ProfileType | null,
    status: string
    profileUpdateStatus: boolean
    authorizedUserId: number | null
}

type DispatchPropsType = {
    updateStatus: (status: string) => void
    getProfileId: (userId: number) => void
    getUserStatus: (userId: number) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileContainer: FC<MapPropsType & DispatchPropsType> = (props) => {
    let { userId } = useParams<{ userId?: string }>()

    let navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            userId = props.authorizedUserId + '';
            if (!userId) {
                navigate('/login');
            }
        }

        if (!userId) {
            console.error('ID has to exist in URI params or in state (authorizedId)')
        } else {
            props.getProfileId(+userId)
            props.getUserStatus(+userId)
        }
    }, [userId])

    return <Profile {...props}
        isOwner={!userId}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        profileUpdateStatus={props.profileUpdateStatus}
    />
}

let mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    profileUpdateStatus: state.profilePage.profileUpdateStatus
})

export default compose<ComponentType>(
    connect<MapPropsType, DispatchPropsType, {}, RootState>(
        mapStateToProps,
        { getProfileId, getUserStatus, updateStatus, savePhoto, saveProfile }
    ),
    withAuthRedirect
)(ProfileContainer)