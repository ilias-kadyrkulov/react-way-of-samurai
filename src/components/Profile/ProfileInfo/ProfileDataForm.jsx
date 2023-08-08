import React from "react"
import styles from './ProfileInfo.module.css'
import formStyles from '../../common/FormsControls/FormsControls.module.css'
import { reduxForm } from "redux-form";
import { Input, Textarea, createField } from "../../common/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={formStyles.formSummaryControl}>
            {error}
        </div>}
        <div>
            <b>Fullname</b>: {createField("Full name...", [], 'fullName', Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField("Looking for a job...", [], 'lookingForAJob', Input, { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills</b>: {createField("My professional skills...", [], 'lookingForAJobDescription', Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField("About me...", [], 'aboutMe', Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>
                <div key={key} className={styles.contact}>
                    <b>{key}: {createField(key, [], 'contacts.' + key, Input)}</b>
                </div>)}
        </div>
    </form>
}

export default reduxForm({
    form: 'editProfile'
})(ProfileDataForm);