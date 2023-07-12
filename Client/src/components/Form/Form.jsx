import style from './Form.module.css'
import { useState } from 'react'
import validate from './validation'

const Form = ({ login }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    
    const [errors, setErrors] = useState({
        email: "Completar",
        password: "Completar"
    })
    
    const handleChange = (event) => {
        let type = event.target.name
        let value = event.target.value

        setUserData({
            ...userData,
            [type]: value
        })

        setErrors({
            ...errors,
            [type]: validate(type, value)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData)
    }

    return <>
        <div className={style.container}>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1 className={style.loginText}>Login</h1>

                <div className={style.inputBox}>
                    <div className={style.divEmail}>Email: </div>
                    <input type="email" name='email' value={userData.email} placeholder='Email...' onChange={handleChange} className={style.inpEmail}/>
                    <div className={style.emailError}>{errors.email}</div>
                    
                    <div className={style.divPassword}>Password: </div>
                    <input type="password" name='password' value={userData.password} placeholder='Password...' onChange={handleChange} className={style.inpPassword}/>
                    <div className={style.passwordError}>{errors.password}</div>
                
                </div>
                <button disabled={errors.email||errors.password} className={style.btn} onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    </>
};

export default Form