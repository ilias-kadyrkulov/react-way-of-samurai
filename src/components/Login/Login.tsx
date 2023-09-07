import React, { FC } from 'react'
import { login } from '../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';
import LoginForm, { LoginFormValuesType } from './LoginForm/LoginForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const LoginPage: FC = (props) => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

  const dispatch = useAppDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    const { email, password, rememberMe, captcha } = formData;
    dispatch(login(email, password, rememberMe, captcha))
  }

  if (isAuth) return <Navigate to='/profile' />

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </>
  )
}