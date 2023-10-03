import React, { FC } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink';

const setActive = ({ isActive }) => isActive ? 'active-link' : '';

const Navbar: FC = () => {
    return (
        <nav className='nav'>
            <div>
                <NavLink to='/react-way-of-samurai/profile' className={setActive}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to='/react-way-of-samurai/dialogs' className={setActive}>
                    Messages
                </NavLink>
            </div>
            <div>
                <NavLink to='/react-way-of-samurai/users' className={setActive}>
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
            <CustomLink to='/react-way-of-samurai/dialogs'>
                useMatch Dialogs
            </CustomLink>
        </nav>
    )
}

export default Navbar