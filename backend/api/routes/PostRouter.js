import express from 'express'
import Post from '../../DBmodels/PostSchema.js'
import User from '../../DBmodels/RegisterUserSchema.js'
import AWS from 'aws-sdk'
import FileType from 'file-type'
import multiparty from 'multiparty'
import fs from 'fs'
import dotenv from 'dotenv'
import authMiddleware from '../AuthMiddleware.js'
import Comment from '../../DBmodels/CommentSchema.js'

dotenv.config()
export const router = express.Router()

// init AWS instance
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ca-central-1'
})

// init s3 instance
const s3 = new AWS.S3()

router.get('/', (req, res) => {
  res.send(' hello post router!')
})

router.post('/upload-image', async (req, res) => {
  const form = new multiparty.Form()
  // parse form data
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error)
    }
    try {
      // get params data
      const path = files.file[0].path
      const buffer = fs.readFileSync(path)
      const type = await FileType.fromBuffer(buffer)
      const fileName = `image/${files.file[0].originalFilename}`
      const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.S3_BUCKET,
        ContentType: type.mime,
        Key: fileName
      }
      // upload image to s3
      const data = await s3.upload(params).promise()
      return res.status(200).send(data)
    } catch (err) {
      console.log('Try post error ', err)
      return res.status(500).send(err)
    }
  })
})

router.get('/all-posts', authMiddleware, async (req, res) => {
  Post.find({ postedBy: req.user }).sort({ createdAt: -1 })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    const { caption, imageURL } = req.body

    // create new post with Post schema

    const post = new Post({
      caption: caption,
      imageURL: imageURL,
      postedBy: req.user,
      username: req.user.username,
      comments: []
    })
    // save post
    await post.save()
    // adding the post id to the user's posts array
    await req.user.postsID.push(post._id)
    await req.user.save()
    res.json({ post })
  } catch (err) {
    res.status(500).json({ Error: err.message })
  }
})

router.get('/newsfeedposts', authMiddleware, async (req, res) => {
  // finding the posts that are posted by all the users inside the following array of the logged in user
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id')
    .then(posts => {
      res.send(posts)
    })
    .catch(err => res.status(400).json(err.message))
})

// getting other user's post
router.get('/otheruser_posts/:UserID', authMiddleware, async (req, res) => {
  User.findById(req.params.UserID)
    .then(user => {
      Post.find({ postedBy: user })
        .then(result => {
          res.send(result)
        })
        .catch(err => {
          res.status(400).json(err.message)
        })
    })
    .catch(err => {
      res.status(400).json(err.message)
    })
})

router.post('/add-comment', authMiddleware, async (req, res) => {
  try {
    const content = req.body.content
    console.log(content)
    const postedBy = req.user.username
    const postId = req.body.postId
    console.log(postId)

    const newcomment = new Comment({
      content: content,
      postedBy: postedBy,
      postID: postId
    })
    await newcomment.save()
    await Post.findById(postId).updateOne({ $push: { comments: newcomment } })
    res.json({ newcomment: newcomment })
  } catch (err) {
    res.status(500).json(err.message)
  }
})

router.get('/getcomment', authMiddleware, async (req, res) => {
  await Comment.find().sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.json(err.message)
    })
})

// Delete Endpoint
router.delete('/delete', (res, req) => {

})

export default router
