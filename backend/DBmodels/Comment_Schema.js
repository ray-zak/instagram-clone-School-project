import mongoose from "mongoose";

const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const comment_schema = new Schema({

    content: {type:String},
    postedBy: {type:String},//type: mongoose.Schema.Types.ObjectId, ref:"User"},
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post"}
})

export default mongoose.model('Comment', comment_schema);