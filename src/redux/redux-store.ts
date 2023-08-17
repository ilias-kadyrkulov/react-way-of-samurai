import { configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"

const reducers = {
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
}

export const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>

type PropertiesTypes<T> = T extends {[key: string]: infer U } ? U : never // conditional type (infer, mapped type)
export type InferActionsTypes<T extends {[key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>> // constraint

// window.store = store