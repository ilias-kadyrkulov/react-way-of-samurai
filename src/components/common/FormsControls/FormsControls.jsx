import React from "react"
import styles from './FormsControls.module.css'
import { Field } from "redux-form";

const FormControl = ({ meta: { error, touched }, children }) => {
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

export const Textarea = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, validators, fieldName, component, props, text = '') => (
    <div>
        <Field
            placeholder={placeholder}
            validate={validators}
            name={fieldName}
            component={component}
            {...props}
        /> {text}
    </div>
)