const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/"

const getCharacter = (req, res) => {
    const { id } = req.params
    axios(`${URL}${id}`)
        .then(response => response.data)
        .then(data => {
            let character = new Object()

            if (data){
                character = {
                    id: data.id,
                    status: data.status,
                    name: data.name,
                    species: data.species,
                    origin: data.origin,
                    image: data.image,
                    gender: data.gender
                }
                return res.status(200).send(JSON.stringify(character))
            } else return res.status(404).send("Not found")

        }).catch(error => res.status(404).send("Not found"))
};

module.exports = {
    getCharacter
};