const validate = (type, value) => {
    // - debe ser un Email
    // - el nombre de usuario no puede estar vacio
    // - el nombre de usuario debe ser menor o igual a 35 caracteres

    //   Password
    // - debe contener como minimo un numero
    // - longitud entre 6 y 10 caracteres

    let validate;
    switch (type){
        case 'email':
            validate = /^[^\s@]{1,35}@[^\s@]+\.[^\s@]+$/
            return validate.test(value)
                ? ''
                : 'Email invalido'

        case 'password':
            validate = /^(?=.*\d)[A-Za-z\d]{6,10}$/
            return validate.test(value)
                ? ''
                : 'Password invalido'
    }
};

export default validate