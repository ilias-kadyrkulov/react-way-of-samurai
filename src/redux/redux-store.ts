import { Action, combineReducers, configureStore } from "@reduxjs/toolkit"
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"
import chatReducer from "./chat-reducer"

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// type PropertiesTypes<T> = T extends {[key: string]: infer U } ? U : never // conditional type (infer, mapped type), т.е. Generic тип, 
// export type InferActionsTypes<T extends {[key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>> // constraint, 
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never 
// в одну строку, т.к. Prop.Types хранил рез-т U, кот. выводил нам infer(что угодно); а тут по итогу параметр T - {}, у которого ключ типа string, а значение - (),
// кот. принимает что-то, и возвращает {} - именно тип этой функции мы фиксируем, infer выводит тип
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>

// window.store = store