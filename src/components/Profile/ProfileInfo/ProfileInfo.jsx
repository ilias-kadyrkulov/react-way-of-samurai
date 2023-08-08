import React from 'react'
import styles from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.png'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoChanged = (e) => {
        if(e.target.files.length) savePhoto(e.target.files[0])
    }

    return (
        <div>

            <div className={styles.profileDesc}>
                <img className={styles.userAvatar}
                    src={profile.photos.large || userPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoChanged} />}
                <h3>{profile.fullName}</h3>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo