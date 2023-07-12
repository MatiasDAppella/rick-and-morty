import style from './Favorites.module.css'
import { connect, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import Card from '../Cards/Card/Card'
import { filterCards, orderCards } from '../../redux/actions'
import Message from '../Message/Message'

const Favorites = ({ myFavorites, filtered, onClose }) => {
    const dispatch = useDispatch()
    const [aux, setAux] = useState({ order: "null", filter: "null" })
    const [displayedChars, setDisplayedChars] = useState([])

    useEffect(() => {
        if (aux.order == "null" && aux.filter == "null") setDisplayedChars(myFavorites)
        else setDisplayedChars(filtered)

    }, [myFavorites, filtered])

    const handleShowAll = () => {
        setAux({ order: "null", filter: "null" })
        setDisplayedChars(myFavorites)
        console.log(myFavorites)
    }

    const handleOrder = (event) => {
        if (event.target.value !== null){
            setAux(({order: event.target.value, filter: "null"}))
            dispatch(orderCards(event.target.value))
            setDisplayedChars(filtered)
            console.log(filtered)
        }
    }

    const handleFilter = (event) => {
        if (event.target.value !== null){
            setAux({order: "null", filter: event.target.value})
            dispatch(filterCards(event.target.value))
            setDisplayedChars(filtered)
            console.log(filtered)
        }
    }

    return <>
        <div>
            <div className={style.filterBox}>
                <select id='order' value={aux.order} onChange={handleOrder}>
                    <option value="null" disabled>Select order</option>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>

                <select id='filter' value={aux.filter} onChange={handleFilter}>
                    <option value="null" disabled>Select filter</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
                <button onClick={handleShowAll}>Show all</button>
            </div>

            { displayedChars.length === 0  && <Message message={'No matches!'}/>}

            <div className={style.container}>{
                displayedChars?.map(card => 
                    <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        status={card.status}
                        species={card.species}
                        gender={card.gender}
                        origin={card.origin}
                        image={card.image}
                        onClose={onClose}
                    ></Card>
                )}
            </div>
        </div>
    </>
};

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites,
        filtered: state.filtered
    }
};

export default connect(
    mapStateToProps,
    null
)(Favorites)