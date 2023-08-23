import React, { FC } from 'react'
import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import { ProfileType } from '../../types/types'

type PropsType = {
    profileUpdateStatus: boolean
    isOwner: boolean
    profile: ProfileType | null
    status: string

    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => void
    savePhoto: (photo: File) => void
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo profileUpdateStatus={props.profileUpdateStatus}
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile