import React, { FC } from 'react'
import styles from './MessageItem.module.css'

type PropsType = {
    message: string
}

const MessageItem: FC<PropsType> = (props) => {
    return (
        <div className={styles.dialog}>{props.message}</div>
    )
}

export default MessageItem