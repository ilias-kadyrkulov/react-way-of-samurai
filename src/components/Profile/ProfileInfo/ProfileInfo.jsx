import React, { useState } from 'react'
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

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile, profileUpdateStatus }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoChanged = (e) => {
        if (e.target.files.length) savePhoto(e.target.files[0])
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        if (profileUpdateStatus) {
            setEditMode(false);
        }
    }
    
    return (
        <div>
            <div className={styles.profileDesc}>
                <img className={styles.userAvatar}
                    src={profile.photos.large || userPhoto} />
                {isOwner && <input type={'file'} onChange={onMainPhotoChanged} />}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo