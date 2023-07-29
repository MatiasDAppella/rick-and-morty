const { User, Character, user_favorite } = require('../database');

class Controller {

  getAll = async (UserId) => {
    if (!UserId) throw new Error('Faltan datos!');
    const favorites = await user_favorite.findAll({ where: { UserId }, attributes: ['CharacterId']})

    if (!favorites) return favorites
    let favoritesWithInfo = new Array()

    while (favorites.length){
        let id = favorites.shift().CharacterId
        let data = await Character.findByPk(id)

        favoritesWithInfo.push(data)
    }

    return favoritesWithInfo
  };

  post = async (UserId, CharacterId) => {
    if (!UserId||!CharacterId) throw new Error('Faltan datos!');
    const user = await User.findByPk(UserId);
    const char = await Character.findByPk(CharacterId);

    if (!user||!char) throw new Error('Error en la conexión!');
    user.addCharacter(char);
    return char
  };

  delete = async (UserId, CharacterId) => {
    if (!UserId||!CharacterId) throw new Error('Faltan datos!');
    const user = await User.findByPk(UserId);
    const char = await Character.findByPk(CharacterId);

    if (!user||!char) throw new Error('Error en la conexión!');
    user.removeCharacter(char);
    return char.id
  };

};

// Export new instance of Controller as "favController"
const favController = new Controller();

module.exports = {
  favController
};