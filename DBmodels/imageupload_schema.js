import mongoose from "mongoose";
const image_schema = new mongoose.Schema({
    caption: String,
    user: String,
    image : String ,
    comments: []

});

export default mongoose.model("uploadingimg", image_schema);
