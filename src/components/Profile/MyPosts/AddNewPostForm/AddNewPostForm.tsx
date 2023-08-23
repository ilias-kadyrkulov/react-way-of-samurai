import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input, Textarea, createField } from "../../../common/FormsControls/FormsControls";
import { required } from "../../../../utils/validators/validators";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>('Enter text for new post', 'newPostText', [required], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}


export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddPostForm' })(AddNewPostForm)