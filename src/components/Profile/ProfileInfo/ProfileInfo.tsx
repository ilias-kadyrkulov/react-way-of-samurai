import React, { ChangeEvent, FC, useState } from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.png'
// import facebookIcon from '../../../assets/icons/facebook.svg'
// import instagramIcon from '../../../assets/icons/instagram.svg'
// import twitterIcon from '../../../assets/icons/twitter.svg'
// import vkIcon from '../../../assets/icons/vk.svg'
// import youtubeIcon from '../../../assets/icons/youtube.svg'
// import websiteIcon from '../../../assets/icons/website.png'
// import githubIcon from '../../../assets/icons/github.svg'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ProfileData from './ProfileDataForm/ProfileData'
import { ProfileType } from '../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { savePhoto, saveProfile } from './../../../redux/profile-reducer'

type PropsType = {
    isOwner: boolean
}

const ProfileInfo: FC<PropsType> = ({ isOwner }) => {
    const profile = useAppSelector((state) => state.profilePage.profile)
    const profileUpdateStatus = useAppSelector(
        (state) => state.profilePage.profileUpdateStatus
    )

    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false)

    const onMainPhotoChanged = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) dispatch(savePhoto(e.target.files[0]))
    }

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        if (profileUpdateStatus) {
            setEditMode(false)
        }
    }

    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={styles.profileDesc}>
                <img
                    className={styles.userAvatar}
                    src={profile.photos.large || userPhoto}
                />
                {isOwner && (
                    <input type={'file'} onChange={onMainPhotoChanged} />
                )}

                {editMode ? (
                    <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => {
                            setEditMode(true)
                        }}
                    />
                )}

                <ProfileStatusWithHooks />
            </div>
        </div>
    )
}

export default ProfileInfo
