import style from './Cards.module.css'
import Card from './Card/Card'

// Hooks
import { useSelector } from 'react-redux'

const Cards = ({ onClose }) => {
    const characters = useSelector((state) => state.characters)

    return <>
        <div className={style.container}>{
            characters?.map(card => 
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
    </>
};

export default Cards