import style from './Detail.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Detail = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState({})
    
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.origin)
                if (res.name){
                    setCharacter(res)
                }
            }).catch()

        return setCharacter({})
    }, [])

    console.log('info:', character)
    return <>
        <div className={style.detail}>
            <div className={style.imageBox}>
                <div className={style.id}>{id}</div>
                <img className={style.img} src={character.image} alt=""/>
            </div>

            <div className={style.dataContainer}>
                <div className={style.name}>{character.name}</div>
                
                <div className={style.infoBox}>
                    <div className={  character.status === 'Alive' ? style.alive
                                    : character.status === 'Dead' ? style.dead
                                    : style.unknown}>{character.status}</div>

                    <div className={style.info}>
                        <div className={style.gender}>- {character.gender}</div>
                        <div className={style.species}>- {character.species}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Detail