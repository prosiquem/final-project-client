import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { MEDIA } from '../../consts/path.consts'
import {NavLink} from 'react-router-dom'

import { Button, Nav, Navbar, Col, Row } from 'react-bootstrap'
import { BoxArrowLeft, ChevronDoubleLeft, ChevronDoubleRight, CollectionFill, CompassFill, HouseFill, PersonFill, PlusCircleFill } from 'react-bootstrap-icons'


const Navigation = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Navbar className={`sidebar justify-content-between ${isExpanded ? 'expanded' : ''}`}>
            <Row className='brand-expand align-items-center w-100'>
                <Col md={`${loggedUser ? `${isExpanded ? '10' : '8'}` : ''}`}>
                    <Navbar.Brand>
                        <Row className='align-items-center'>
                            <Col md={`${isExpanded ? '4' : '12'}`} className={`${!loggedUser ? 'text-center' : ''}`}>
                                <img
                                    src={MEDIA.ISOLOGO}
                                    width="46" />
                            </Col>

                            {isExpanded && (
                                <Col >
                                    <h4>Kōon</h4>
                                </Col>
                            )}
                        </Row>
                    </Navbar.Brand>
                </Col>
                {loggedUser &&
                    <Col md={`${isExpanded ? '2' : '4'}`}>

                        {!isExpanded && (
                            <Button className="nav-button-expand" variant='custom-transparent' size='sm' onClick={toggleExpand}>
                                <ChevronDoubleRight />
                            </Button>
                        )}

                        {isExpanded && (
                            <Button className="nav-button-retract" variant='custom-transparent' size='sm' onClick={toggleExpand}>
                                <ChevronDoubleLeft />
                            </Button>
                        )}
                    </Col>
                }
            </Row>

            {loggedUser &&
                <>
                    <Nav className="flex-column w-100 h-100 my-4">

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

                        <NavLink 
                        to={ loggedUser && loggedUser.role === 'ARTIST'? "/album/new" : "/playlist/new"}
                        className={({ isActive }) => isActive ? "nav-link selected" : "nav-link"}
                        >
                            <PlusCircleFill />
                            {isExpanded && <span className="button-title ">{loggedUser && loggedUser.role === 'ARTIST' ? 'Crear album' : 'Crear playlist'}</span>}
                        </NavLink>
                    </Nav>

                    <Button variant='custom-primary'>
                        <BoxArrowLeft />
                        {isExpanded && <span className="button-title ">Cerrar sesión</span>}
                    </Button>
                </>

            }
        </Navbar >
    )
}

export default Navigation
