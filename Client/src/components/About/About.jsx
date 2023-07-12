import style from './About.module.css'
import githubIcon from '../../assets/icons/github.png'
import instagramIcon from '../../assets/icons/instagram.png'

const About = () => {
    return <>
        <div className={style.about}>
            <div className={style.imageBox}></div>

            <div className={style.textBox}>
                <h1 className={style.h1}>¡Hi there!</h1>
                <h2 className={style.h2}>
                    You may be wondering who i am...<br/>
                    Well, take a look:</h2>
                <h4></h4>
            </div>

            <div className={style.iconsBox}>
                <a href="https://github.com/MatiasDAppella" target='_blank'><img className={style.githubIcon} src={githubIcon} alt="" /></a>
                <a href="https://www.instagram.com/matiiapp/" target='_blank'><img className={style.instagramIcon} src={instagramIcon} alt="" /></a>
            </div>
        </div>
    </>
};

export default About

// github ico author: https://www.flaticon.com/authors/pixel-perfect
// instagram ico author https://www.flaticon.es/autores/freepik