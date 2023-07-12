import style from './Message.module.css'
import img from '../../assets/have-that.png'

const Message = ({ message }) => {

    return <>
        <div className={style.message}>
            <img className={style.img} src={img} alt="" />
            <h1 className={style.h1}>{message}</h1>
        </div>
    </>
};

export default Message