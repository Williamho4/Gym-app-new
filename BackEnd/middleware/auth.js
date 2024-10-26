const jwt = require('jsonwebtoken')

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
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified

    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' })
    }
    console.error('JWT verification error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = verifyToken // Ensure you export correctly
