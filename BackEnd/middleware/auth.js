const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')

    if (!token) {
      return res
        .status(403)
        .json({ message: 'Access Denied: No token provided' })
    }

    if (!token.startsWith('Bearer ')) {
      return res.status(400).json({ message: 'Invalid token format' })
    }

    token = token.slice(7).trim()
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })

    if (!user) return res.status(401).json({ message: 'Invalid token' })

    req.user = user

    const userObject = user.toObject()
    delete userObject.password

    next()
  } catch (err) {
    res.status(401).json({
      message:
        err.name === 'TokenExpiredError'
          ? 'Token has expired'
          : 'Invalid token',
    })
  }
}

module.exports = verifyToken // Ensure you export correctly
