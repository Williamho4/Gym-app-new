const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const userRoutes = require('./routes/userRoutes')
const exercisesRoutes = require('./routes/exercisesRoutes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.json({ limit: '100mb' }))

app.use('/user', userRoutes)
app.use('/exercises', exercisesRoutes)

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
