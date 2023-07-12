import style from './SearchBar.module.css'
import { useState, useRef, useEffect } from 'react'

const SearchBar = ({ onSearch, getRandomChar, repeated }) => {
    const [id, setId] = useState('')
    const input = useRef(null)

    useEffect(() => {

    }, [repeated])

    const handleChange = (event) => {
        setId(event.target.value)
    }

    const handleAddClick = (event) => {
        onSearch(id)
        setId('')
        input.current.focus()
    }

    const handleRandomClick = () => {
        getRandomChar()
    }

    return <>
        <div className={style.addCharacterBar}>
            <div className={style.searchBar}>
                <input className={style.input} type="search" onChange={handleChange} value={id} ref={input}/>
                <button disabled={repeated} className={style.btnAdd} onClick={handleAddClick}>Add</button>
            </div>
            <button className={style.btnRandomChar} onClick={handleRandomClick}>Random</button>
        </div>
    </>
};

export default SearchBar