import React from 'react'
import styles from '../ProfileInfo.module.css'
import facebookIcon from '../../../../assets/icons/facebook.svg'

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
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
            <b>Contacts</b>:  {Object.keys(profile.contacts).map(key =>
                <Contact key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key]}
                />
            )}
        </div>
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={styles.contact}>
        <img className={styles.icon} src={facebookIcon} /> <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileData