import mongoose from "mongoose";

const Schema = mongoose.Schema;

const comment_schema = new Schema({

    content: {type:String},
    postedBy: {type:String},
    postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post"}
})

export default mongoose.model('Comment', comment_schema);