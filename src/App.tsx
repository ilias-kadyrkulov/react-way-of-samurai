import React, { ComponentType, FC, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { UsersPage } from './components/Users/UsersPage'
import { LoginPage } from './components/Login/Login'
import { Provider, connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { RootState, store } from './redux/redux-store'
import MainLayout from './MainLayout'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { parse } from 'query-string/base'

const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage'))
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

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
        <Suspense fallback={<Preloader />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<ProfilePage />} />
                    <Route path="profile/:userId?" element={<ProfilePage />} />
                    <Route path="messages" element={<Dialogs />} />
                    <Route
                        path="developers"
                        element={<UsersPage pageTitle="The Samurai" />}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="*" element={<div>NOT FOUND PAGE</div>} />
                </Route>
            </Routes>
        </Suspense>
    )
}

const mapStateToProps = (state: RootState) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
    connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJSApp: FC = () => {
    return (
        <BrowserRouter>
            <QueryParamProvider
                adapter={ReactRouter6Adapter}
                // options={{
                //     searchStringToObject: parse
                // }}
            >
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </QueryParamProvider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp
