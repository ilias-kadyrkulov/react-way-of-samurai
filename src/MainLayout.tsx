import React from 'react'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import {
    LaptopOutlined,
    ProfileOutlined,
    MessageOutlined
} from '@ant-design/icons'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

const sidebarItems: MenuProps['items'] = [
    getItem('My Profile', 'my-profile', <ProfileOutlined />, [
        getItem(
            'Item 1',
            'g1',
            null,
            [getItem('Option 1', '1'), getItem('Option 2', '2')],
            'group'
        ),
        getItem(
            'Item 2',
            'g2',
            null,
            [getItem('Option 3', '3'), getItem('Option 4', '4')],
            'group'
        )
    ]),

    getItem('Messages', 'dialogs', <MessageOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [
            getItem('Option 7', '7'),
            getItem('Option 8', '8')
        ])
    ]),
    getItem('Developers', 'developers', <LaptopOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12')
    ])
]

const MainLayout: React.FC = () => {
    const {
        token: { colorBgContainer }
    } = theme.useToken()

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e)
    }

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer }}
                >
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            onClick={onClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={sidebarItems}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Samurai Social Network ©2023 Created by IT-KAMASUTRA
            </Footer>
        </Layout>
    )
}

export default MainLayout
