import React, { FC } from 'react'
import styles from '../ProfileInfo.module.css'
import facebookIcon from '../../../../assets/icons/facebook.svg'
import { ContactsType, ProfileType } from '../../../../types/types'

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<PropsType> = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Fullname</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:  {
                Object.keys(profile.contacts)
                    .map(key =>
                        <Contact key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}
                        />
                    )}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={styles.contact}>
        <img className={styles.icon} src={facebookIcon} /> <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileData