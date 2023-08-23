import React, { Component, ComponentType, FC, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { Provider, connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { RootState, store } from './redux/redux-store'

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const App: FC<MapPropsType & DispatchPropsType> = (props) => {
  useEffect(() => {
    props.initializeApp()
  }, [])

  if (!props.initialized) {
    return <Preloader />
  }
  
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />

      <div className='app-wrapper-content'>
        <Suspense fallback={<Preloader />}>
        <Routes>
          <Route path='/' element={<ProfileContainer />} />
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/profile/:userId?' element={<ProfileContainer />} />
          <Route path='/users' element={<UsersContainer pageTitle='The Samurai' />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        </Suspense>
      </div>

    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp: FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;