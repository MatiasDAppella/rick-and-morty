const { User } = require('../database');

class Controller {

  post = async (email, password) => {
    if (!email||!password) throw new Error('Faltan datos!');
    else return await User.create({ email, password });
  };

  get = async (email, password) => {
    if (!email||!password) throw new Error('Faltan datos!');
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Usuario no encontrado!');
    if (user.password !== password) throw new Error('Contraseña incorrecta!');
    return user;
  };

};

// Export new instance of Controller as "userController"
const userController = new Controller();

module.exports = {
  userController
};