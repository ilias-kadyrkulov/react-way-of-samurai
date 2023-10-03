import { Button, Form, Input, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatMessageAPIType } from '../../api/chat-api'
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
    const status = useAppSelector((state) => state.chat.status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())

        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <Notification />}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

const Messages: FC = () => {
    const messages = useAppSelector((state) => state.chat.messages)

    const [isAutoScroll, setIsAutoScroll] = useState(false)
    const messageAnchorRef = useRef<HTMLDivElement>(null)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (
            Math.abs(element.scrollHeight - element.scrollTop) -
                element.clientHeight <
            300
        ) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div
            style={{ height: '400px', overflowY: 'auto' }}
            onScroll={scrollHandler}
        >
            {messages.map((m, index) => (
                <Message key={index} message={m} />
            ))}
            <div ref={messageAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(
    ({ message }) => {
        console.log('message')

        return (
            <div>
                <img
                    style={{ height: '40px' }}
                    src={message.photo}
                    alt="Avatar"
                />{' '}
                <b>{message.userName}</b>
                <br />
                {message.message}
                <hr />
            </div>
        )
    }
)

const AddMessageForm: FC = () => {
    const status = useAppSelector((state) => state.chat.status)

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
                    <Button
                        disabled={status !== 'ready'}
                        type="primary"
                        htmlType="submit"
                    >
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
        message: 'Error occured',
        description: 'Please refresh the page.',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />
    })

    return <>{contextHolder}</>
}

export default ChatPage
