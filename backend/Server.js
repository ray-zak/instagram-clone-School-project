import express from 'express'
import cors from 'cors'
// import pusher from 'pusher'
import mongoose from 'mongoose'
import userRouter from './api/routes/UserRouter.js'
import postRouter from './api/routes/PostRouter.js'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
  console.log('MongoDB connection established successfully')
})

app.get('/', (req, res) => {
  console.log('server is running ')

  res.send('hello world')
})

app.use('/users', userRouter)

app.use('/posts', postRouter)

app.listen(port, () => {
  console.log('server is running on port ' + port)
})

export default app