import { Button, Form, Input, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import React, { FC, useEffect, useState } from 'react'
import { ChatMessageType } from '../../api/chat-api'
import {
    startMessagesListening,
    stopMessagesListening
} from '../../redux/chat-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { sendMessage } from './../../redux/chat-reducer'

const ChatPage: FC = () => {
    return <Chat />
}
const Chat: FC = () => {
    const [channelStatus, setChannelStatus] = useState<
        'online' | 'offline' | null
    >(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {channelStatus === 'offline' && <Notification />}
            <Messages />
            <AddMessageForm />
        </>
    )
}

const Messages: FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)

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

const AddMessageForm: FC = () => {
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
        'pending'
    ) //NOTE - 119.1; Создается local state readyStatus (wsChannel.readyState !== WebSocket.OPEN), кот. м.б. только pending или ready

    const dispatch = useAppDispatch()

    const onFinish = (values: { newMessageBody: string }) => {
        dispatch(sendMessage(values.newMessageBody))
    }

    return (
        <div>
            <Form onFinish={onFinish}>
                <Form.Item name="newMessageBody">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button disabled={false} type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const Notification: FC = (props) => {
    const [api, contextHolder] = notification.useNotification()

    api.open({
        message: 'Notification Title',
        description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
    })

    return <>{contextHolder}</>
}

export default ChatPage
