const { User, Character } = require('../database');

class Controller {

  post = async (UserId, CharacterId) => {
    if (!UserId||!CharacterId) throw new Error('Faltan datos!');
    const user = await User.findByPk(UserId);
    const char = await Character.findByPk(CharacterId);

    if (!user||!char) throw new Error('Error en la conexión!');
    return user.addCharacter(char);
  };

  delete = async (UserId, CharacterId) => {
    if (!UserId||!CharacterId) throw new Error('Faltan datos!');
    const user = await User.findByPk(UserId);
    const char = await Character.findByPk(CharacterId);

    if (!user||!char) throw new Error('Error en la conexión!');
    return user.removeCharacter(char);
  };

};

// Export new instance of Controller as "favController"
const favController = new Controller();

module.exports = {
  favController
};