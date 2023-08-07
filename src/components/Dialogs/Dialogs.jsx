import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import MessageItem from './MessageItem/MessageItem'
import AddMessageForm from './AddMessageForm/AddMessageForm'


const Dialogs = (props) => {

    let state = props.dialogsPage;

    const addNewMessage = (formData) => {
        props.sendMessage(formData.newMessageBody);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {state.dialogs.map(d =>
                    <DialogItem key={d.id} id={d.id} name={d.name} />
                )}
            </div>
            <div className={styles.messages}>
                {state.messages.map(m =>
                    <MessageItem key={m.id} message={m.message} />
                )}
            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}


export default Dialogs