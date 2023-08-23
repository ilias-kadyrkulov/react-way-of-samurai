import React, { FC } from 'react'
import { Textarea, createField } from '../../common/FormsControls/FormsControls'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { NewMessageFormValuesType } from '../Dialogs';

const maxLength50 = maxLengthCreator(50);

type NewMessageFormOwnProps = {}

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, NewMessageFormOwnProps> & NewMessageFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys> ('Enter your message', 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType, NewMessageFormOwnProps>({ form: 'dialogAddMessageForm' })(AddMessageForm)