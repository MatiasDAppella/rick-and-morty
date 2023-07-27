const { Character } = require('../database');
const axios = require('axios');

// URLs
const URL = "https://rickandmortyapi.com/api/character/"

class Controller {
  
  get = async (id) => {
    if (!id) throw new Error('Se debe proporcionar id!');
    let char = await Character.findByPk(id);
  
    if (!char) char = await this._add(id);
    if (!char) throw new Error('No existe ese character!');
    return char;
  };

  _add = async (id) => {
    try {
      const { data } = await axios(`${URL}${id}`)
      const character = {
          id: data.id,
          name: data.name,
          status: data.status,
          species: data.species,
          gender: data.gender,
          origin: data.origin.name,
          image: data.image
      }
      const newCharacter = await Character.create(character)
      return newCharacter

    } catch (error) {
      return null
    }
  };

};

// Export new instance of Controller as "charController"
const charController = new Controller();

module.exports = {
  charController
};