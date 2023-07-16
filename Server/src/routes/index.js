const { getCharacter } = require('../controllers/getCharacter')
const { postFav, deleteFav } = require('../controllers/handleFavorites')
const { login } = require('../controllers/login')
const express = require('express')

const router = express.Router()

router.get("/character/:id", (req, res) => {
    return getCharacter(req, res)
});

router.get("/login", (req, res) => {
    return login(req, res)
});

router.post("/fav", (req, res) => {
    return postFav(req, res)
});

router.delete("/fav/:id", (req, res) => {
    return deleteFav(req, res)
});

module.exports = router