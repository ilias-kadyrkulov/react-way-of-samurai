import React, { FC } from 'react'
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/redux-store';
import LoginForm, { LoginFormValuesType } from './LoginForm/LoginForm';

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    const { email, password, rememberMe, captcha } = formData;
    props.login(email, password, rememberMe, captcha)
  }

  if (props.isAuth) return <Navigate to='/profile' />

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
  )
}

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)

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