import mongoose from  "mongoose";

const userSchema = new mongoose.Schema({

    username: {type: String, required : true , unique:true},
    password: {type: String, minlength: 8 , required:true},
    email: {type: String, required: true},
    followers: [],
    postsID: []
});

export default mongoose.model("User" , userSchema);