import React, { FC } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { logout } from '../../redux/auth-reducer'
import { Avatar, Button, Col, Layout, Menu, MenuProps, Row } from 'antd'
import { UserOutlined, MessageOutlined, LaptopOutlined, WechatOutlined } from '@ant-design/icons';
import { selectIsAuth, selectLogin } from '../../redux/auth-selectors'

const navItems: MenuProps['items'] = [
    {
        label: <Link to="/profile">My Profile</Link>,
        key: 'profile',
        icon: <UserOutlined />
    },
    {
        label: <Link to="/messages">Messages</Link>,
        key: 'messages',
        icon: <MessageOutlined />
    },
    {
        label: <Link to="/developers">Developers</Link>,
        key: 'developers',
        icon: <LaptopOutlined />
    },
    {
        label: <Link to="/chat">Chat</Link>,
        key: 'chat',
        icon: <WechatOutlined />
    }
]

const Header: FC = (props) => {
    const { Header } = Layout

    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectLogin)

    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Header>
                <Row>
                    <Col span={18}>
                        <Menu theme="dark" mode="horizontal" items={navItems} />
                    </Col>

                    {isAuth ? (
                        <>
                            <Col span={5}>
                                <Avatar
                                    style={{ background: '#87d068' }}
                                    icon={<UserOutlined />}
                                />
                                <span style={{color: '#fff', marginLeft: '5px'}}>{login}</span>
                            </Col>
                            <Col span={1}>
                                <Button onClick={handleLogout}>Log out</Button>
                            </Col>
                        </>
                    ) : (
                        <Col span={6}>
                            <Link to="/login">Login</Link>
                        </Col>
                    )}
                </Row>
            </Header>
    )
}

export default Header
