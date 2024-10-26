const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const User = require('./models/userModel')
const Exercise = require('./models/execiseModel')
const verifyToken = require('./middleware/auth')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })

    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.send(err)
  }
})

app.post('/user', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findByCredentials(username, password)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

const storage = multer.memoryStorage() // Store files as Buffer
const upload = multer({ storage: storage })

app.post('/exercise', verifyToken, upload.single('image'), async (req, res) => {
  const { name, muscle } = req.body

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' })
  }

  try {
    const exercise = new Exercise({ name, muscle, img: req.file.buffer })
    await exercise.save()
    res.status(201).json(exercise)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    res.send(exercises)
  } catch (err) {
    res.status(500)
  }
})

app.get('/exercise/:id/image', async (req, res) => {
  try {
    const exercise = await Exercise.findOne({ _id: req.params.id })

    res.set('Content-Type', 'image/jpg')
    res.send(exercise.img)
  } catch (err) {
    res.status(500)
  }
})

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(4000, () => {
      console.log('Listening on port 4000')
    })

    console.log('Connected to mongoDB')
  })
  .catch((err) => {
    console.log(err)
  })
