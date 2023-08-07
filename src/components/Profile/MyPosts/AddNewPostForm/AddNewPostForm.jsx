import React from "react";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    
    return (
            <form onSubmit={props.handleSubmit}>
                <Field component={Textarea} validate={[required, maxLength10]} name={'newPostText'} placeholder='Enter text for new post' />
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}


export default reduxForm({ form: 'profileAddPostForm' })(AddNewPostForm)