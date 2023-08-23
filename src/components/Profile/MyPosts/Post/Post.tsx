import React, { FC } from 'react'
import styles from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className={styles.item}>
            <img src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg" alt="" />
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post