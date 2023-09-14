let subscribers = [] as SubsriberType[] //NOTE - subcribers - [] функций с логикой dispatch messages; 

//NOTE - Не должно быть ничего связанного с UI или Store (DAL - нижний слой)

let ws: WebSocket | null = null //NOTE - 120; Так же как и axios, WebSocket уносится в отдельный файл, где с ним можно будет взаимодействовать через API объект chatAPI

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    //NOTE - 118; GET запрос, и когда пользователь отправит сообщение, все те, кто слушают message (event) - будут получать его (из объекта 'e')
    const newMessages = JSON.parse(e.data)
    subscribers.forEach((s) => s(newMessages)) //ANCHOR - 120; Вызови каждого подписчика ((messages) => dispatch(actions.messagesReceived(messages)) и передай в аргументы newMessages 
}

function createChannel() {
    //NOTE - 119.4.1; Создание WebSocket после первого рендера
    ws = new WebSocket( //NOTE - 118; Тот самый канал, по которому браузер общается с сервером, 2 типа данных: txt и binary (byte...)
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    )
    ws.addEventListener('close', closeHandler) //NOTE - 119.4.5.1; И как только он умрет, рекурсивно вызвать createChannel()
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubsriberType) { //ANCHOR - subcribers - [] функций(_newMessageHandler) с логикой dispatch messages; Поначалу их нет (messages), subscribe происходит в компоненте Chat после ее рендера единожды через Thunk'у startMessagesListening и создания канала WebSocket - так происходит подписка; Откуда функция в subscribers[] берет messages - messageHandler.
        subscribers.push(callback)

        return () => {
            subscribers = subscribers.filter((s) => s !== callback) //ANCHOR - store.subscribe у Redux возвращает функцию, которую если вызвать произойдет отписка
        }
    },
    unsubscribe(callback: SubsriberType) {
        subscribers = subscribers.filter((s) => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubsriberType = (messages: ChatMessageType[]) => void //NOTE - (), кот. принимает messages, тип которого - массив объектов с типом ChatMessageType
