const express = require('express')
const multer = require('multer')
const verifyToken = require('../middleware/auth')

const Exercise = require('../models/execiseModel')

const router = express.Router()

const storage = multer.memoryStorage() // Store files as Buffer
const upload = multer({ storage: storage })

router.post(
  '/create',
  verifyToken,
  upload.single('image'),
  async (req, res) => {
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
  }
)

router.post('/upload', verifyToken, async (req, res) => {
  try {
    const { workout } = req.body

    if (!workout) {
      return res.status(400).json({ message: 'Workout data is required' })
    }

    req.user.workouts.push(workout)

    await req.user.save()

    res.status(201).json(req.user.workouts)
  } catch (err) {
    console.error('Error uploading workout:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/savedWorkouts', verifyToken, (req, res) => {
  res.send(req.user.workouts)
})

router.patch('/updateWorkouts', verifyToken, async (req, res) => {
  try {
    const { workouts } = req.body

    // Validate the workouts data (basic validation example)
    if (!Array.isArray(workouts)) {
      return res.status(400).json({ message: 'Workouts must be an array.' })
    }

    // Assign the new workouts to the user's workouts
    req.user.workouts = workouts

    // Save the updated user object
    await req.user.save()

    // Send back the updated workouts with a 200 OK status
    return res.status(200).json(req.user.workouts)
  } catch (error) {
    console.error('Error updating workouts:', error) // Log the error for debugging
    return res
      .status(500)
      .json({ message: 'An error occurred while updating workouts.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    res.send(exercises)
  } catch (err) {
    res.status(500)
  }
})

router.get('/:id/image', async (req, res) => {
  try {
    const exercise = await Exercise.findOne({ _id: req.params.id })

    res.set('Content-Type', 'image/jpg')
    res.send(exercise.img)
  } catch (err) {
    res.status(500)
  }
})

module.exports = router
