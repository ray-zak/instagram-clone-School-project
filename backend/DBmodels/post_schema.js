import mongoose from "mongoose";

const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types

const postSchema = new Schema({

    caption: {type: String},
    imageURL : {type: String},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //comments: [ { comment_ID: String, create_date: Date, by: mongoose.Schema.Types.ObjectId } ]
    comments:[],
},{timestamps: true});


export default mongoose.model('Post', postSchema);