// Enrouter
const express = require('express')
const loginRouter = express.Router()

// Controllers
const { userController } = require('../controllers/usersControllers')

// Path: rickandmorty/login
loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body
    const newUser = await userController.post(email, password)

    return res.status(200).send(newUser)
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

loginRouter.get("/", async (req, res) => {
  try {
    const { email, password } = req.query
    await userController.get(email, password)

    return res.status(200).send({ access: true })
  } catch (error) {
    
    return res.status(400).send(error.message)
  }
});

module.exports = loginRouter