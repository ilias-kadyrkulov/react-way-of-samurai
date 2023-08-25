import React, { FC } from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: FC<MapPropsType & DispatchPropsype> = (props) => {
    return (
        <header className={styles.header}>
            <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-mobile-software-icon-png-image_6315991.png" alt="Logo" />

            <div className={styles.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header