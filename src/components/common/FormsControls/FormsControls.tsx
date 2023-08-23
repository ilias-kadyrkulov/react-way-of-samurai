import React, { FC } from "react"
import styles from './FormsControls.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../../../utils/validators/validators"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}
const FormControl: FC<FormControlPropsType> = ({ meta: { error, touched }, children }) => {
    let hasError = error && touched;

    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


export function createField<FormKeysType extends string>(placeholder: string | undefined,
    fieldName: FormKeysType,
    validators: Array<FieldValidatorType> | undefined,
    component: React.FC<WrappedFieldProps>,
    props = {},
    text = '') {
    return <div>
        <Field
            placeholder={placeholder}
            validate={validators}
            name={fieldName}
            component={component}
            {...props}
        /> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>