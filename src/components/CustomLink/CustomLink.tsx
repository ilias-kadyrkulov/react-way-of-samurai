import React, { FC } from 'react'
import { Link, Path, PathPattern, To, useMatch } from 'react-router-dom'

type PropsType = {
    children: React.ReactNode
    to: any
}

const CustomLink: FC<PropsType> = ({ children, to, ...props }) => {
    const match = useMatch(to);
    
    return (
        <Link
            to={to}
            {...props}
            style={{color: match ? 'green' : 'red'}}
        >
            {children}
        </Link>
    )
}

export default CustomLink