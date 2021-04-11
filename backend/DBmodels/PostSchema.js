import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({

  caption: { type: String },
  imageURL: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [],
  username: { type: String }
}, { timestamps: true })

export default mongoose.model('Post', postSchema)
