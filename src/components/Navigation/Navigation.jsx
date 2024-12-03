import { Button, Nav, Navbar } from 'react-bootstrap'
import { useState } from 'react'
import './Navigation.css'
import { CollectionFill } from 'react-bootstrap-icons'

const Navigation = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <Navbar className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
            <Nav className="flex-column w-100">
                {!isExpanded && (
                    <Button className="button-expand" onClick={toggleExpand}>
                        <i className="fa fa-chevron-right"></i>
                    </Button>
                )}

                {isExpanded && (
                    <Button className="button-retract" onClick={toggleExpand}>
                        <i className="fa fa-chevron-left"></i>
                    </Button>
                )}

                <Button className="nav-button-home">
                    <i className="fa-solid fa-house"></i>
                    {isExpanded && <span className="button-title">Home</span>}
                </Button>

                <Button className="nav-button">
                    <i className="fa-solid fa-user"></i>
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
