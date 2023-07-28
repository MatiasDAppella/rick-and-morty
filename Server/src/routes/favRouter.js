// Enrouter
const express = require('express')
const favRouter = express.Router()

// Controllers
const { favController } = require('../controllers/favControllers')

// Path: rickandmorty/fav
favRouter.post("/getall", async (req, res) => {
  try {
    console.log(req.body)
    const { UserId } = req.body;
    const allFavorites = await favController.getAll(UserId)

    return res.status(200).send(allFavorites)
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

favRouter.post("/", async (req, res) => {
  try {
    const { UserId, CharacterId } = req.body;
    const fav = await favController.post(UserId, CharacterId)

    return res.status(200).send(fav)
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

favRouter.delete("/", async (req, res) => {
  try {
    const { UserId, CharacterId } = req.body;
    await favController.delete(UserId, CharacterId)

    return res.status(200).send("Personaje eliminado de favoritos")
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

module.exports = favRouter