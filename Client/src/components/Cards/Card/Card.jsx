import style from './Card.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { addFav, removeFav } from '../../../redux/actions'
import { useEffect, useState } from 'react'

const Card = (props) => {
    const [isFav, setIsFav] = useState(false)
    const {
        id,
        name,
        status,
        species,
        gender,
        origin,
        image,
        onClose,
        myFavorites,
        removeFav,
        addFav

    } = props

    console.log(props)
    useEffect(() => {
        myFavorites.forEach((fav) => {
           if (fav.id === props.id) {
              setIsFav(true);
           }
        });
    }, [myFavorites])

    const handleFavorite = () => {
        if (isFav) {
            setIsFav(false)
            removeFav(id)
        } else {
            setIsFav(true)
            addFav(props)
        }
    }

    return <>
        <div className={style.card}>
            <div className={style.imageBox}>
                {
                    isFav ? (
                        <button onClick={handleFavorite} className={style.btnFav}>❤️</button>
                    ) : (
                        <button onClick={handleFavorite} className={style.btnFav}>🤍</button>
                    )
                }
                <button className={style.btn} onClick={() => onClose(id)}>x</button>
                <NavLink className={style.link} to={'/detail/' + id}><img className={style.img} src={image} alt=''/></NavLink>
                <div className={style.name}>{name}</div>
                
            </div>
            <div className={style.infoBox}>
                <div className={  status.toUpperCase() === 'ALIVE' ? style.alive
                                : status.toUpperCase() === 'DEAD' ? style.dead
                                : style.unknown}>{status}</div>

                <div className={style.info}>
                    <div className={style.species}>{species}</div>
                    <div className={style.gender}>{gender}</div>
                    <div className={style.origin}>{origin}</div>
                </div>

            </div>
        </div>
    </>
};

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFav: (props) => dispatch(addFav(props)),
        removeFav: (id) => dispatch(removeFav(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);