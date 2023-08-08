import React, { useEffect } from 'react'
import { useState } from 'react'

const ProfileStatusWithHooks = (props) => {
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

    const statusOnChanged = (e) => {
        setStatus(e.target.value)
    }

    // const componentDidUpdate = (prevProps, prevState) => {
    //     if (prevProps.status !== props.status) {
    //         setState({
    //             status: props.status
    //         })
    //     }
    // }

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