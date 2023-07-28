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

    return res.status(200).send({ id: newUser.id })
  } catch (error) {
    
    return res.status(400).send({ id: "" })
  }
});

loginRouter.get("/", async (req, res) => {
  try {
    const { email, password } = req.query
    const user = await userController.get(email, password)

    return res.status(200).send({ id: user.id })
  } catch (error) {
    
    return res.status(200).send({ error: error.message })
  }
});

module.exports = loginRouter