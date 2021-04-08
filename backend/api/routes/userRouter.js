import express from 'express'
import User from '../../DBmodels/RegisterUserSchema.js' // importing the user object (schema)
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const router = express.Router()

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Register Endpoint

router.post('/register', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username

    // Followers and posts should be initially blank, not provided by API
    const followers = []
    const postsID = []

    // validation

    if (!email || !password || !username) {
      return res.status(400).json({ msg: 'Required Fields must not be blank' })
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password is too short' })
    }
    // checking if there is an existing user with the same email and username
    const checkingExistingUserEmail = await User.findOne({ email: email }) // checking the user in the database to find if there is an existing email address & username
    const checkingExistingUserUsername = await User.findOne({ username: username })
    if (checkingExistingUserEmail != null || checkingExistingUserUsername != null) {
      return res.status(400).json({ msg: 'An existing account with the same email address/username already exists' })
    }
    // hashing the password
    const salt = await bcrypt.genSalt(8) // creating the salt for hashing
    const passwordHash = await bcrypt.hash(password, salt) // hash the password
    console.log(passwordHash)

    const newUser = new User({ // creating the user_schema_object
      username: username,
      password: passwordHash,
      email: email,
      followers: followers,
      postsID: postsID

    })

    const savedUser = await newUser.save() // saving the user in the database
    console.log(savedUser)
    res.json(savedUser) // returning the user to the frontend
  } catch (err) {
    res.status(500).json({ Error: err.message })
  }
})

// Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    // validate

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username or password is empty ' })
    }

    // looking for the existing user in DB
    const findingUser = await User.findOne({ username: username })

    if (!findingUser) {
      return res.status(400).json({ msg: 'No user matches this username ' })
    }

    // comparing the typed password with the hashed one in the database
    const matchingPass = await bcrypt.compare(password, findingUser.password)

    // checking if the password does not  match
    if (!matchingPass) {
      return res.status(400).json({ msg: 'Invalid Password' })
    }

    // JWT token :  gives every logged in user a unique token that will be helpful for us to identify the user and use it if it is logged in or not
    const token = jwt.sign({ id: findingUser._id }, process.env.JWT_SECRET)

    res.json({
      token,
      username: findingUser.username,
      email: findingUser.email,
      id: findingUser._id

    })
  } catch (err) {
    res.status(500).json({ Error: err.message })
  }
})

// Follow a user

router.route('/follow/:userId/:targetId').post((req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user.following.includes(req.params.targetId)) {
        user.following.push(req.params.targetId)
        user.save()
          .then(() => res.json('User followed'))
          .catch(err => res.status(400).json('Error: ' + err))
      } else {
        res.json('You already follow that user !')
      }
    })
    .catch(err => { console.log('Error: ', err.message) })

  User.findById(req.params.targetId)
    .then(targetUser => {
      if (!targetUser.followers.includes(req.params.userId)) {
        targetUser.followers.push(req.params.userId)
        targetUser.save()
          .then(() => res.json('Added to followers'))
          .catch(err => res.status(400).json('Error: ' + err))
      }
    })
    .catch(err => { console.log('Error: ', err.message) })
})

router.route('/unfollow/:userId/:targetId').post((req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (user.following.includes(req.params.targetId)) {
        const indexToUnfollow = user.following.indexOf(req.params.targetId)
        user.following.splice(indexToUnfollow, 1)
        user.save()
          .then(() => res.json('User unfollowed'))
          .catch(err => res.status(400).json('Error: ' + err))
      } else {
        res.json("You don't follow that user")
      }
    })
    .catch(err => { console.log('Error: ', err.message) })

  User.findById(req.params.targetId)
    .then(targetUser => {
      if (targetUser.followers.includes(req.params.userId)) {
        const indexToRemoveFromFollowers = targetUser.followers.indexOf(req.params.userId)
        targetUser.followers.splice(indexToRemoveFromFollowers, 1)
        targetUser.save()
          .then(() => res.json('User removed from followed'))
          .catch(err => res.status(400).json('Error ' + err))
      }
    })
    .catch(err => { console.log('Error: ', err.message) })
})

export default router
