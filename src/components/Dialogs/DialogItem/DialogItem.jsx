import React from 'react'
import styles from '../Dialogs.module.css'
import { NavLink } from 'react-router-dom'


const Item = (props) => {

    return (
        <div className={styles.dialog}>
            <NavLink to={props.id}>{props.name}</NavLink>
        </div>
    )
}

export default Item