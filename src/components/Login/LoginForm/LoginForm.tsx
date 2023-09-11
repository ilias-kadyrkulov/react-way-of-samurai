import React, { FC } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { login } from '../../../redux/auth-reducer'

type FieldType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: FC = (props) => {
    const captchaUrl = useAppSelector((state) => state.auth.captchaUrl)

    const dispatch = useAppDispatch()

    const handleLogin = (values: FieldType) => {
        const { email, password, rememberMe, captcha } = values
        dispatch(login(email, password, rememberMe, captcha))
    }

    return (
        <Form onFinish={handleLogin}>
            <Form.Item<FieldType>
                name="email"
                rules={[{ required: true, message: 'Required field.' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Required field.' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && (
                <Form.Item<FieldType>
                    name="captcha"
                    rules={[{ required: true, message: 'Required field.' }]}
                >
                    <Input />
                </Form.Item>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}
