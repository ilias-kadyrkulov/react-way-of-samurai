import React from 'react'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'

const maxLength10 = maxLengthCreator(10);

const AddMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required, maxLength10]} name={'newMessageBody'} placeholder='Enter your message' />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)