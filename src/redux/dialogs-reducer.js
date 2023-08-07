const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Coding' },
        { id: 3, message: 'Jiza' }
    ],
    dialogs: [
        { id: 1, name: 'Purira' },
        { id: 2, name: 'Pureira' },
        { id: 3, name: 'Purrito' },
        { id: 4, name: 'Perrito' },
        { id: 5, name: 'Ursulla' },
        { id: 6, name: 'Ursuliha' }
    ]
}


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
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

export const sendMessageCreator = (newMessageBody) => ({ type: 'SEND_MESSAGE', newMessageBody })

export default dialogsReducer;