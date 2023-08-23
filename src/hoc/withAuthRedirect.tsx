import React, { ComponentType, FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../redux/redux-store'

let mapStateToPropsForRedirect = (state: RootState) => ({
  isAuth: state.auth.isAuth
})

type MapPropsType = {
  isAuth: boolean
}

type DispatchPropsType = {}

export function withAuthRedirect<WCP extends MapPropsType>(WrappedComponent: ComponentType<WCP>) {
  const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
    let { isAuth, ...restProps } = props
    if (!isAuth) return <Navigate to='/login' />
    return <WrappedComponent {...restProps as WCP} />

  }
  let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, RootState>(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent)
  return ConnectedAuthRedirectComponent
}