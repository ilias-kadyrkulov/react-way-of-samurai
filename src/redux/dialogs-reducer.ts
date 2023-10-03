import { InferActionsTypes } from "./redux-store";

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Coding' },
        { id: 3, message: 'Goog, good' }
    ] as Array<MessageType>,
    dialogs: [
        { id: 1, name: 'Sardar' },
        { id: 2, name: 'Dias' },
        { id: 3, name: 'Vishu' },
        { id: 4, name: 'Bayel' },
        { id: 5, name: 'Akbar' },
        { id: 6, name: 'Andrei' }
    ] as Array<DialogType>
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "sn/dialogs/send_message":
            let newMessage = {
                id: 4,
                message: action.newMessageBody
            }
            return {
                ...state,
                messages: [...state.messages, newMessage] // копируются элементы из старого массива, и добавляем еще один элемент в конце
            };
        // stateCopy.messages.push(newMessage); push редко используется в настоящее время
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'sn/dialogs/send_message', newMessageBody } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>