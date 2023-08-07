import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css'


const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('E-mail', [required], 'email', Input)}
      {createField('Password', [required], 'password', Input, { type: 'password' })}
      {createField(null, null, 'rememberMe', Input, { type: 'checkbox' }, 'Remember me')}
      {error && <div className={styles.formSummaryControl}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const Login = (props) => {
  const onSubmit = (formData) => {
    const { email, password, rememberMe } = formData;
    props.login(email, password, rememberMe)
  }

  if (props.isAuth) return <Navigate to='/profile' />

  return (
    <>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)