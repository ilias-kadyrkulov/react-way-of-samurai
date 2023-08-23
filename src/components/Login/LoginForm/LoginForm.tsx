import React, { FC } from 'react'
import styles from '../../common/FormsControls/FormsControls.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { GetStringKeys, Input, createField } from '../../common/FormsControls/FormsControls'
import { required } from '../../../utils/validators/validators'

type PropsType = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('E-mail', 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'Remember me')}
            {error &&
                <div className={styles.formSummaryControl}>
                    {error}
                </div>
            }
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input)}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export default reduxForm<LoginFormValuesType, PropsType>({ form: 'login' })(LoginForm)