import { FormAction } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { ChatMessageAPIType, StatusType, chatAPI } from '../api/chat-api'
import { Dispatch } from 'redux'
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id: string} 

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType //NOTE - 121; нужно для того, чтобы пользователь знал, что еще нет коннекта
}

const chatReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'sn/chat/messages_received': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.map(m => ({...m, id: v1() }))].filter((m,index,array) => index >= array.length - 100)
            }
        }
        case 'sn/chat/status_changed': {
            return {
                ...state,
                status: action.payload
            }
        }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({
            type: 'sn/chat/messages_received',
            payload: messages
        } as const),
    statusChanged: (status: StatusType) =>
        ({
            type: 'sn/chat/status_changed',
            payload: status
        } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    //NOTE - при подписке и отписке вызывается одно и то же - нужна мемоизация
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch)) //NOTE - 121; Отписка и подписка на изменение статуса
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage =
    (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message)
    }

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
