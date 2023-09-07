import React, { FC } from 'react'
import styles from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsMemorized from './MyPosts/MyPosts'

type PropsType = {
    isOwner: boolean
}

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={styles.profile}>
            <ProfileInfo isOwner={props.isOwner} />
            <MyPostsMemorized />
        </div>
    )
}

export default Profile