import React, { FC } from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MessageItem";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from "../../redux/dialogs-reducer";

export type MapPropsType = {
  dialogsPage: InitialStateType;
};

export type DispatchPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type NewMessageFormValuesType = {
  newMessageBody: string;
};

const Dialogs: FC<MapPropsType & DispatchPropsType> = (props) => {
  let state = props.dialogsPage;

  const addNewMessage = (formData: NewMessageFormValuesType) => {
    props.sendMessage(formData.newMessageBody);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {state.dialogs.map((d) => (
          <DialogItem key={d.id} id={d.id} name={d.name} />
        ))}
      </div>
      <ul className={styles}>
        <li></li>
      </ul>
      <div className={styles.messages}>
        {state.messages.map((m) => (
          <MessageItem key={m.id} message={m.message} />
        ))}
      </div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
