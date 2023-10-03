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
import { addCharacter, getAllFavorites, logUser, removeCharacter, removeFav } from './redux/actions'

function App({loggedUser, logUser, addCharacter, removeCharacter, getAllFavorites }) {

    /* -------------------------- Login -------------------------- */
    const navigate = useNavigate()

    const login = (userData) => {
        const { email, password } = userData
        const URL = "https://rick-and-morty-api-tikr.onrender.com/rickandmorty/login/"

        fetch(`${URL}?email=${email}&password=${password}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) console.log(data.error)
                else logUser(data.id)
            }).catch()
    }

    useEffect(() => {
        if (loggedUser !== ""){
            getAllFavorites(loggedUser)
            navigate('/home')
        }
        else navigate('/')
    }, [loggedUser])
    
    
    /* ---------------------- Chars in api ----------------------- */
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


    /* ----------------------- Functions ------------------------ */
    const onSearch = (id) => {
        // no cards repeated
        if (!availableChars.includes(Number(id))){
            setRepeated(true)
        } else {
            addCharacter(id)
            setAvailableChars(availableChars.filter(e => e !== Number(id)))
        }
    }

    const getRandomChar = () => {
        let randomIndex = Math.floor(Math.random() * availableChars.length)
        onSearch(availableChars[randomIndex])
    }

    const onClose = (id) => {
        removeCharacter(id)
        setAvailableChars([...availableChars, Number(id)])
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
            <Route path='/home' element={<Cards onClose={onClose}/>}/>
            <Route path='/favorites' element={<Favorites onClose={null}/>}/>
            <Route path='/detail'><Route path=':id' element={<Detail/>}/></Route>
            <Route path='/about' element={<About/>}/>
        </Routes>
        
        <footer>Made with ♥ by Matias Appella</footer>
    </>
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
}
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeFav: (id) => dispatch(removeFav(id)),
        logUser: (id) => dispatch(logUser(id)),
        addCharacter: (id) => dispatch(addCharacter(id)),
        removeCharacter: (id) => dispatch(removeCharacter(id)),
        getAllFavorites: (id) => dispatch(getAllFavorites(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
