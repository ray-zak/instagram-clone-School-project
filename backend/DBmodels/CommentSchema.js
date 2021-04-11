import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({

  content: { type: String },
  postedBy: { type: String },
  postID: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
})

export default mongoose.model('Comment', commentSchema)
