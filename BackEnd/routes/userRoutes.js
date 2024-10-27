const express = require('express')
const router = express.Router()

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
require('dotenv').config()

router.post('/signUp', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findByCredentials(username, password)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    user.tokens.push({ token })
    await user.save()

    res.status(200).json({ user })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

router.post('/verifyToken', verifyToken, async (req, res) => {
  res.send({ user: req.user })
})

module.exports = router
