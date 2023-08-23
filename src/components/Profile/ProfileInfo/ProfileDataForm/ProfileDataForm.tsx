import React, { FC } from "react"
import styles from '../ProfileInfo.module.css'
import formStyles from '../../../common/FormsControls/FormsControls.module.css'
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, Textarea, createField } from "../../../common/FormsControls/FormsControls";
import { ProfileType } from "../../../../types/types";

type PropsType = {
    profile: ProfileType
}

type ProfileDataFormTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>
        {error && <div className={formStyles.formSummaryControl}>
            {error}
        </div>}
        <div>
            <b>Fullname</b>: {createField<ProfileDataFormTypeKeys>("Full name...", 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField<ProfileDataFormTypeKeys>("Looking for a job...", 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills</b>: {createField<ProfileDataFormTypeKeys>("My professional skills...", 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me</b>: {createField<ProfileDataFormTypeKeys>("About me...", 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>
                <div key={key} className={styles.contact}>
                    <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                </div>)}
        </div>
    </form>
}

export default reduxForm<ProfileType, PropsType>({
    form: 'editProfile'
})(ProfileDataForm);