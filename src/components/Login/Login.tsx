import React, { FC } from 'react'
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css'
import { RootState } from '../../redux/redux-store';


type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('E-mail', 'email', [required], Input)}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [] , Input, { type: 'checkbox' }, 'Remember me')}
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

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string) => void
}
type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormValuesTypeKeys = keyof LoginFormValuesType

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    const { email, password, rememberMe, captcha } = formData;
    props.login(email, password, rememberMe, captcha)
  }

  if (props.isAuth) return <Navigate to='/profile' />

  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)