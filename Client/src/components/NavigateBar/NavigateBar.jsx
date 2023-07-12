import style from './NavigateBar.module.css'
import SearchBar from './SearchBar/SearchBar'
import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NavigateBar = ({ onSearch, getRandomChar, repeated }) => {
    const [path, setPath] = useState('')
    const { pathname } = useLocation()

    useEffect(() => {
        setPath(pathname)
    }, [pathname])

    return path !== '/' ? <>
        <nav className={style.nav}>
            <div className={style.linksMenu}>
                <NavLink to='/home' className={
                    path == '/home'
                    ? style.selectedNavLink
                    : style.navLink
                }>Home</NavLink>

                <NavLink to='/favorites' className={
                    path == '/favorites'
                    ? style.selectedNavLink
                    : style.navLink
                }>Favorites</NavLink>

                <NavLink to='/about' className={
                    path == '/about'
                    ? style.selectedNavLink
                    : style.navLink
                }>About</NavLink>

            </div>
            <SearchBar
                onSearch={onSearch}
                getRandomChar={getRandomChar}
                repeated={repeated}
            />
        </nav>
    </> : <></>
};

export default NavigateBar