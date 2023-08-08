import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer, { withRouter } from './components/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { Provider, connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />

        <div className='app-wrapper-content'>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/profile/:userId?' element={<ProfileContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default SamuraiJSApp;