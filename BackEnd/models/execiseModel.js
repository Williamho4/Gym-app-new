const mongoose = require('mongoose')
const { trim } = require('validator')

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  muscle: {
    type: String,
    trim: true,
    require: true,
    lowercase: true,
  },
  img: {
    type: Buffer,
  },
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
