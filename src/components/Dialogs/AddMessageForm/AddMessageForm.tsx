import React, { FC } from 'react'
import { Button, Form, Input } from 'antd'
import { actions } from '../../../redux/dialogs-reducer'
import { useAppDispatch } from '../../../hooks/redux'

type FieldType = {
    newMessageBody: string
}

export const AddMessageForm: FC = (props) => {
    const dispatch = useAppDispatch()

    const handleAddNewMessage = (values: FieldType) => {
        dispatch(actions.sendMessage(values.newMessageBody))
    }

    return (
        <Form onFinish={handleAddNewMessage}>
            <Form.Item<FieldType>
                name="newMessageBody"
                rules={[{ required: true, message: 'Required field.' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
    )
}
