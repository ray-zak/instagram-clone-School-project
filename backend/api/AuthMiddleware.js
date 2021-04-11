
import jwt from 'jsonwebtoken'
import User from '../DBmodels/RegisterUserSchema.js'

const auth = (req, res, next) => {
  console.log(req.headers)
  const { authorization } = req.headers
  console.log(authorization)
  if (!authorization) {
    return res.status(401).json({ error: 'No authentication token, authorization denied.' })
  }
  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'Token verification failed, authorization denied.' })
    }
    const { id } = payload
    User.findById(id).then(userdata => {
      req.user = userdata
      next()
    })
  })
}

export default auth
