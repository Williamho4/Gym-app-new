const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid Email')
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    workouts: [
      {
        type: Array,
      },
    ],
    tokens: [{ token: { type: String } }],
  },
  {
    timestamps: true,
  }
)

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username })

  if (!user) {
    throw new Error('Unable to login')
  }

  if (user.password !== password) {
    throw new Error('Unable to login')
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
