import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import SubList from './SubList'

const NavItem = ({title, url, subItems, isHover, setIsHover}) => {
    const navigate = useNavigate()
    const { userLogged, setUserLogged } = useContext(UserContext)
    const handleLogout = () => {
        setUserLogged(false)
        navigate("/")
    }
    const handleMouseEnter =(e) => {
        setIsHover(true)
    }
    const handleMouseLeave =(e) => {
        setIsHover(false)
    }
  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='list-item'>
        <Link to={url}>{title} 
        {isHover && <SubList subItems={subItems}/>}
        </Link>
    </li>
  )
}

export default NavItem