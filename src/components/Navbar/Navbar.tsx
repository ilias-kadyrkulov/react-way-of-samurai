import React, { FC } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink';

const setActive = ({ isActive }) => isActive ? 'active-link' : '';

const Navbar: FC = () => {
    return (
        <nav className='nav'>
            <div>
                <NavLink to='/profile' className={setActive}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className={setActive}>
                    Messages
                </NavLink>
            </div>
            <div>
                <NavLink to='/users' className={setActive}>
                    Users
                </NavLink>
            </div>
            <div>
                <a>News</a>
            </div>
            <div>
                <a>Music</a>
            </div>
            <div>
                <a>Settings</a>
            </div>
            <CustomLink to='/dialogs'>
                useMatch Dialogs
            </CustomLink>
        </nav>
    )
}

export default Navbar