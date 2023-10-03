const subscribers = {
    'message-received': [] as MessagesReceivedSubsriberType[], //NOTE - [] подписчиков на сообщения
    'status-changed': [] as StatusChangedSubsriberType[] //NOTE - [] подписчиков на статус
} //NOTE - subcribers - [] функций с логикой dispatch messages;

//NOTE - Не должно быть ничего связанного с UI или Store (DAL - нижний слой)

let ws: WebSocket | null = null //NOTE - 120; Так же как и axios, WebSocket уносится в отдельный файл, где с ним можно будет взаимодействовать через API объект chatAPI

type EventsNamesType = 'message-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    //NOTE - 118; GET запрос, и когда пользователь отправит сообщение, все те, кто слушают message (event) - будут получать его (из объекта 'e')
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach((s) => s(newMessages)) //ANCHOR - 120; Вызови каждого подписчика ((messages) => dispatch(actions.messagesReceived(messages)) и передай в аргументы newMessages
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach((s) => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    //NOTE - 119.4.1; Создание WebSocket после первого рендера
    ws = new WebSocket( //NOTE - 118; Тот самый канал, по которому браузер общается с сервером, 2 типа данных: txt и binary (byte...)
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
    )
    notifySubscribersAboutStatus('pending') //NOTE - 121; Уведомляем подписчиков, что сейчас режим pending
    ws.addEventListener('close', closeHandler) //NOTE - 119.4.5.1; И как только он умрет, рекурсивно вызвать createChannel()
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubsriberType | StatusChangedSubsriberType //NOTE - могут прийти или такой, или такой подписчик
    ) {
        //ANCHOR - subcribers - [] функций(_newMessageHandler) с логикой dispatch messages; Поначалу их нет (messages), subscribe происходит в компоненте Chat после ее рендера единожды через Thunk'у startMessagesListening и создания канала WebSocket - так происходит подписка; Откуда функция в subscribers[] берет messages - messageHandler.
        //@ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(
                (s) => s !== callback
            ) //ANCHOR - store.subscribe у Redux возвращает функцию, которую если вызвать произойдет отписка
        }
    },
    unsubscribe(
        eventName: EventsNamesType,
        callback: MessagesReceivedSubsriberType | StatusChangedSubsriberType
    ) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(
            (s) => s !== callback
        )
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'ready' | 'pending' | 'error'

type MessagesReceivedSubsriberType = (messages: ChatMessageAPIType[]) => void //NOTE - (), кот. принимает messages, тип которого - массив объектов с типом ChatMessageType
type StatusChangedSubsriberType = (status: StatusType) => void
