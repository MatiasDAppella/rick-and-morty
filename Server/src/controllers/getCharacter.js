const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/"

const getCharacter = async (req, res) => {
    const { id } = req.params
    try {
        const { data } = await axios(`${URL}${id}`)
        const character = {
            id: data.id,
            status: data.status,
            name: data.name,
            species: data.species,
            origin: data.origin,
            image: data.image,
            gender: data.gender
        }
        return res.status(200).send(character)

    } catch (error) {
        return res.status(404).send("Not found")
    }
};

module.exports = {
    getCharacter
};