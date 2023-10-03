import React, { FC } from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import { useAppSelector } from '../../hooks/redux'
import { Navigate } from 'react-router-dom'
import { AddMessageForm } from './AddMessageForm/AddMessageForm'

const Dialogs: FC = (props) => {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const dialogs = useAppSelector((state) => state.dialogsPage.dialogs)
    const messages = useAppSelector((state) => state.dialogsPage.messages)

    if (!isAuth) return <Navigate to="/react-way-of-samurai/login" />

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogs.map((d) => (
                    <DialogItem key={d.id} id={d.id} name={d.name} />
                ))}
            </div>

            <div className={styles.messages}>
                {messages.map((m) => (
                    <MessageItem key={m.id} message={m.message} />
                ))}
            </div>

            <AddMessageForm />
        </div>
    )
}

export default Dialogs
