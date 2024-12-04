import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { CollectionFill, PlusCircleFill } from 'react-bootstrap-icons'
import { AuthContext } from './../../contexts/auth.context'
import './Navigation.css'

const Navigation = () => {

    const [isExpanded, setIsExpanded] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Navbar className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
            <Nav className="flex-column w-100">

                {!isExpanded && (
                    <Button className="nav-button-expand" onClick={toggleExpand}>
                        <i className="fa fa-chevron-right"></i>
                    </Button>
                )}

                {isExpanded && (
                    <Button className="nav-button-retract" onClick={toggleExpand}>
                        <i className="fa fa-chevron-left"></i>
                    </Button>
                )}

                <Button className="nav-button-home">
                    <i className="fa-solid fa-house"></i>
                    {isExpanded && <span className="button-title">Home</span>}
                </Button>

                <Button className="nav-button">
                    {loggedUser?.avatar ? (
                        <img
                            src={loggedUser.avatar}
                            alt="Avatar"
                            className="avatar-img"
                        />
                    ) : (
                        <i className="fa-solid fa-user"></i>
                    )}
                    {isExpanded && <span className="button-title">Perfil</span>}
                </Button>

                <Button className="nav-button">
                    <i className="fa-solid fa-compass"></i>
                    {isExpanded && <span className="button-title">Explorar</span>}
                </Button>

                <Button className="nav-button">
                    <CollectionFill />
                    {isExpanded && <span className="button-title">Mi biblioteca</span>}
                </Button>

            </Nav>
        </Navbar>
    )
}

export default Navigation
