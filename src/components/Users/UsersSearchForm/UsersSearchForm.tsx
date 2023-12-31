import React, { FC } from 'react'
import { Formik, Form, Field } from 'formik'
import { FilterType } from '../../../redux/users-reducer'
import { useAppSelector } from '../../../hooks/redux'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'null' | 'true' | 'false'
type FormType = {
    // NOTE - для ручного преобразования значений values
    term: string
    friend: FriendFormType
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: FC<PropsType> = React.memo((props) => {
    const filter = useAppSelector((state) => state.usersPage.filter)

    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const filter: FilterType = {
            //SECTION - ручное преобразование
            term: values.term,
            friend:
                values.friend === 'null'
                    ? null
                    : values.friend === 'true'
                    ? true
                    : false
        } //!SECTION

        props.onFilterChanged(filter) //NOTE - вызов (), которая сделает запрос на сервер, т.е. при submit формы
        setSubmitting(false) //NOTE - и isSubmitting сетается на false для пропса кнопки (disabled)
    }
    return (
        <Formik
            enableReinitialize //NOTE - перезагрузка формы при смене initialValues (filter; после перезагрузки страницы значения не стираются)
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }} //NOTE - начальные значения, так же как и в redux-form
            validate={usersSearchFormValidate} // NOTE - валидация на будущее
            // @ts-ignore
            onSubmit={submit} //NOTE - submit - callback(values: {term, friend}(FormType))
        >
            {(
                { isSubmitting } // SECTION - наш <form> тег, который отрисовывается функцией, в props которой isSubmitting
            ) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form> // !SECTION
            )}
        </Formik>
    )
})

export default UsersSearchForm
