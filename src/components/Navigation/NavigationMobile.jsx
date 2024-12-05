import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { NavLink } from 'react-router-dom'

import { Button, Nav, Navbar } from 'react-bootstrap'
import { CollectionFill, CompassFill, HouseFill, PersonFill, PlusCircleFill } from 'react-bootstrap-icons'


const Navigation = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Navbar className={`bottombar ${isExpanded ? 'expanded' : ''}`}>
            {loggedUser &&
                <>
                    <Nav className='w-100 justify-content-between'>

                        <NavLink
                            to="/home"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                        >
                            <HouseFill />
                            {isExpanded && <span className="button-title">Home</span>}
                        </NavLink>

                        <NavLink
                            to="/profile/:id"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                        >
                            {loggedUser?.avatar ? (
                                <img
                                    src={loggedUser.avatar}
                                    alt="Avatar"
                                    className="avatar-img" />
                            ) : (
                                <PersonFill />
                            )}
                            {isExpanded && <span className="button-title  ">Perfil</span>}
                        </NavLink>

                        <NavLink
                            to={loggedUser && loggedUser.role === 'ARTIST' ? "/album/new" : "/playlist/new"}
                            className={({ isActive }) => isActive ? "nav-floating selected" : "nav-floating"}
                        >
                            <PlusCircleFill width="2em" height="2em" />
                            {isExpanded && <span className="button-title ">{loggedUser && loggedUser.role === 'ARTIST' ? 'Crear album' : 'Crear playlist'}</span>}
                        </NavLink>

                        <NavLink
                            to="/explore"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                        >
                            <CompassFill />
                            {isExpanded && <span className="button-title  ">Explorar</span>}
                        </NavLink>

                        <NavLink
                            to="/mylibrary"
                            className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                        >
                            <CollectionFill />
                            {isExpanded && <span className="button-title ">Mi biblioteca</span>}
                        </NavLink>

                    </Nav>
                </>

            }
        </Navbar >
    )
}

export default Navigation
