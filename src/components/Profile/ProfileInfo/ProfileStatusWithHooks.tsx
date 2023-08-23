import React, { ChangeEvent, FC, useEffect } from 'react'
import { useState } from 'react'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatusWithHooks: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const statusOnChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return <>
        {!editMode &&
            <div>
                <b>Status</b>: <span onClick={activateEditMode}>{props.status || '-----'}</span>
            </div>
        }
        {editMode &&
            <div>
                <input onChange={statusOnChanged} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
        }
    </>
}


export default ProfileStatusWithHooks