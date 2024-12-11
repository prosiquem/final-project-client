import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { NavLink } from 'react-router-dom'

import { Col, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { CollectionFill, CompassFill, HouseFill, PersonFill, PlusCircleFill } from 'react-bootstrap-icons'


const Navigation = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Navbar className="bottombar justify-content-evenly">

            <Nav as={Row} className='w-100 justify-content-between'>

                <Col className='text-center'>
                    <NavLink
                        to="/home"
                        className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}>
                        <HouseFill />
                    </NavLink>
                    <label>Home</label>
                </Col>


                <Col className='text-center'>
                    <NavLink
                        to="/profile/:id"
                        className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                    >
                        {loggedUser?.avatar ? (
                            <Image fluid
                                src={loggedUser.avatar}
                                alt="Avatar" roundedCircle />
                        ) : (
                            <PersonFill />
                        )}
                    </NavLink>
                    <label>Perfil</label>
                </Col>

                <Col className='text-center'>
                    <NavLink
                        to={loggedUser && loggedUser.role === 'ARTIST' ? "/album/new" : "/playlist/new"}
                        className={({ isActive }) => isActive ? "nav-floating selected" : "nav-floating"}
                    >
                        <PlusCircleFill width="2em" height="2em" />
                    </NavLink>
                </Col>

                <Col className='text-center'>
                    <NavLink
                        to="/explore"
                        className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                    >
                        <CompassFill />
                    </NavLink>
                    <label >Explorar</label>
                </Col>

                <Col className='text-center'>
                    <NavLink
                        to="/mylibrary"
                        className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                    >
                        <CollectionFill />
                    </NavLink>
                    <label >Biblioteca</label>
                </Col>

            </Nav>

        </Navbar >
    )
}

export default Navigation
