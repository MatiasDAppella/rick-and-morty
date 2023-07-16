import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavigateBar from './components/NavigateBar/NavigateBar'
import Cards from './components/Cards/Cards'
import About from './components/About/About'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import Message from './components/Message/Message'
import Favorites from './components/Favorites/Favorites'
import { connect } from 'react-redux'
import { removeFav } from './redux/actions'

function App({ removeFav }) {
    /* -------------------------- Login -------------------------- */
    const navigate = useNavigate()
    const [access, setAccess] = useState(false)

    const login = (userData) => {
        const { email, password } = userData
        const URL = "http://localhost:3001/rickandmorty/login/"

        fetch(`${URL}?email=${email}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                setAccess(data.access)
            }).catch()
    }

    useEffect(() => {
        access && navigate('/home')
        !access && navigate('/')
    }, [access])
    /* -------------------------- Login -------------------------- */

    const [characters, setCharacters] = useState([])
    const [availableChars, setAvailableChars] = useState([])
    const [repeated, setRepeated] = useState(false)

    useEffect(() => {
        setTimeout(() => setRepeated(false), 1000);
    }, [repeated])

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character`)
            .then(res => res.json())
            .then(res => setAvailableChars(Array.from({ length: res.info.count }, (_, i) => i + 1)))
            .catch()
    }, [])

    const onSearch = (id) => {
        // no cards repeated
        if (!availableChars.includes(Number(id))){
            setRepeated(true)

        } else {

        fetch(`http://localhost:3001/rickandmorty/character/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.name) {
                    setCharacters([...characters, res], console.log(characters)) 
                    setAvailableChars(availableChars.filter(e => e !== Number(id)))
                }
                else window.alert('No hay personajes con ese ID!')
            }).catch()
        }
    }

    const getRandomChar = () => {
        let randomIndex = Math.floor(Math.random() * availableChars.length)
        onSearch(availableChars[randomIndex])
    }

    const onClose = (id) => {
        const result = characters.filter(e => e.id !== Number(id))
        setCharacters(result, setAvailableChars([...availableChars, Number(id)]))
        removeFav(id)
    }

    return <>
        <NavigateBar 
            onSearch={onSearch}
            getRandomChar={getRandomChar}
            repeated={repeated}
        />
        {repeated && <Message message={'You have that!'}/>}

        <Routes>
            <Route path='' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/favorites' element={<Favorites onClose={onClose}/>}/>
            <Route path='/detail'><Route path=':id' element={<Detail/>}/></Route>
            <Route path='/about' element={<About/>}/>
        </Routes>
        
        <footer>Made with ♥ by Matias Appella</footer>
    </>
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFav: (id) => dispatch(removeFav(id))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(App)
