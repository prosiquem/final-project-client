import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import './ExpandingSearchBar.css'

const ExpandingSearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [filterValue, setFilterValue] = useState("")
    const searchRef = useRef(null)

    const handleFilterChange = (e) => {
        const { value } = e.target
        setFilterValue(value)
    }

    const toggleExpand = () => {
        setIsExpanded(true)
    }

    const handleBlur = () => {
        if (!filterValue) {
            setIsExpanded(false)
        }
    }

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsExpanded(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [filterValue])

    return (
        <div className="GlobalFilter">
            <div
                className={`searcher ${isExpanded ? "expanded" : ""}`}
                onClick={toggleExpand}
                ref={searchRef}
            >
                <Form.Control
                    type="text"
                    placeholder="Buscar..."
                    value={filterValue}
                    onChange={handleFilterChange}
                    className="search-input"
                    onBlur={handleBlur}
                    style={{ display: isExpanded ? "block" : "none" }}
                />
                <div className="search-icon">
                    <i className="fa-solid fa-search"></i>
                </div>
            </div>
        </div>
    )
}

export default ExpandingSearchBar
