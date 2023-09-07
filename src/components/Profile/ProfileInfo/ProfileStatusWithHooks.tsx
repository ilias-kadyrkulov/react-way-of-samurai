import React, { ChangeEvent, FC, useEffect } from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { updateStatus } from '../../../redux/profile-reducer'

const ProfileStatusWithHooks: FC = (props) => {
    const status = useAppSelector((state) => state.profilePage.status)

    const [editMode, setEditMode] = useState(false)
    const [statusState, setStatusState] = useState(status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setStatusState(status)
    }, [status])

    const updateUserStatus = (status: string) => {
        dispatch(updateStatus(status))
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        updateUserStatus(statusState)
    }

    const statusOnChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusState(e.target.value)
    }

    return (
        <>
            {!editMode && (
                <div>
                    <b>Status</b>:{' '}
                    <span onClick={activateEditMode}>
                        {statusState || '-----'}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        onChange={statusOnChanged}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={statusState}
                    />
                </div>
            )}
        </>
    )
}

export default ProfileStatusWithHooks
