import React, { FC } from 'react'
import styles from '../Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    return (
        <div className={styles.dialog}>
            <NavLink to={props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem