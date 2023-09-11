import { Button, Form, Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = () => {
    return <Chat />
}
const Chat: FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null) //NOTE - 119.4; Управление жизненным циклом ООП объекта wsChannel (минус дичь со склеиванием этого {} с компонентами через замыкание); wsChannel хранится в state чтобы избежать перезатирания и в конечном счете уничтожения WebSocket

    useEffect(() => {
        //SECTION - Система Реконнекта
        let ws: WebSocket

        const closeHandler = () => {
            console.log('WS CLOSED')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            console.log('CREATE CHANNEL')

            //NOTE - 119.4.1; Создание WebSocket после первого рендера
            ws = new WebSocket( //NOTE - 118; Тот самый канал, по которому браузер общается с сервером, 2 типа данных: txt и binary (byte...)
                'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
            )
            ws.addEventListener('close', closeHandler) //NOTE - 119.4.5.1; И как только он умрет, рекурсивно вызвать createChannel()
            setWsChannel(ws)
        }

        createChannel()
        //!SECTION

        return () => {
            //SECTION - cleanup(); Решение утечки памяти.
            //NOTE - 119.4.6; Мы подписываемся на WebSocket, но потом WebSocket {} умирает, а подписка остается. Дальше создается новый WS, а подписка та же - дичь, утечка памяти.
            ws?.removeEventListener('close', closeHandler) //NOTE - 119.4.6.1; Отписываемся от события close
            ws?.close()
        }
    }, []) //!SECTION

    // useEffect(() => {
    //     //NOTE - 119.4.3; Подписка на событие close при смене состояния wsChannel (происходит при потере соединения с интернетом)
    //     wsChannel?.addEventListener('close', () => {
    //         console.log('WS CLOSED')
    //     })
    // }, [wsChannel])

    return (
        <>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </> //NOTE - 119.4.2; Проброс канала через пропсы другим компонентам, т.к. на верхнем уровне канала большше нет
    )
}

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    //NOTE - 119.4.4; Типизирование канала (optional chaining (wsChannel?.) )
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
        'pending'
    ) //NOTE - 119.1; Создается local state readyStatus (wsChannel.readyState !== WebSocket.OPEN), кот. м.б. только pending или ready

    const onFinish = (values: { newMessageBody: string }) => {
        console.log(values)

        wsChannel?.send(values.newMessageBody) //NOTE - 118; Этакий PUT запрос
    }

    useEffect(() => {
        const openHandler = () => {
            //NOTE - 119.2.; Слушатель на событие open
            console.log('OPEN WS')
            setReadyStatus('ready') //NOTE - 119.2.1; Засетай ready
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            //SECTION - Open channel cleanup()
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel]) //!SECTION

    return (
        <div>
            <Form onFinish={onFinish}>
                <Form.Item name="newMessageBody">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button
                        disabled={wsChannel === null || readyStatus !== 'ready'}
                        type="primary"
                        htmlType="submit"
                    >
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </div> //NOTE - 119.3; Button disabled, пока не прошла синхронизация или пока wsChannel === null
    )
}

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]) //TODO - должен быть Redux

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            console.log('MESSAGE WS')

            //NOTE - 118; GET запрос, и когда пользователь отправит (29 строка) сообщение, все те, кто слушают message (event) - будут получать его (из объекта 'e')
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages]) //ANCHOR - 118; Интересный момент: новое сообщение затирает все остальные сообщения при setMessages([...messages, ...newMessages]), т.к. messages берутся из замыкания, а там пустой []; из-за этого и такой код: функция, которая принимает prevMessages, и возвращает массив бла-бла
        }

        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            //SECTION - Message cleanup()
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel]) //!SECTION

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((m, index) => (
                <Message key={index} message={m} />
            ))}
        </div>
    )
}

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img style={{ height: '40px' }} src={message.photo} alt="Avatar" />{' '}
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

export default ChatPage
