import { FormAction } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { ChatMessageType, chatAPI } from '../api/chat-api'
import { Dispatch } from 'redux'

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'sn/chat/messages_received': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            }
        }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({
            type: 'sn/chat/messages_received',
            payload: messages
        } as const)
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => { //NOTE - при подписке и отписке вызывается одно и то же - нужна мемоизация
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
