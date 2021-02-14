import mongoose from "mongoose";
const image_schema = new mongoose.Schema({
    caption: String,
    user: String,
    imageBase64 : String,
    create_date: { type: Date, default: Date.now },
    comments: [ { comment_ID: String, create_date: Date } ]

});

export default mongoose.model("uploadingimg", image_schema);
