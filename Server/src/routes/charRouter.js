// Enrouter
const express = require('express')
const charRouter = express.Router()

// Controllers
const { charController } = require('../controllers/charControllers')

// Path: rickandmorty/character/:id
charRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const char = await charController.get(id)

    return res.status(200).send(char)
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

module.exports = charRouter