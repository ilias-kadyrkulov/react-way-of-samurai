import React from 'react'
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number> 
    unfollow: (id: number) => void
    follow: (id: number) => void
}

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return <div style={{marginLeft: "15px"}}>
        <span>
            <div>
                <NavLink to={"/profile/" + user.id}>
                    <img src={user.photos.small != null ? user.photos.small
                        : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'}
                        className={styles.userPhoto}
                    />
                </NavLink>
            </div>
            <div>
                {user.followed
                    ? <button disabled={followingInProgress.includes(user.id)} onClick={() => { unfollow(user.id) }}>
                        Unfollow
                    </button>
                    : <button disabled={followingInProgress.includes(user.id)} onClick={() => { follow(user.id) }}>
                        Follow
                    </button>}
            </div>
        </span>
        <span>
            <span>
                <div>
                    {user.name}
                </div>
                <div>
                    {user.status}
                </div>
            </span>
            <span>
                <div>
                    {"user.location.country"}
                </div>
                <div>
                    {"user.location.city"}
                </div>
            </span>
        </span>
    </div>
}

export default User;