import mongoose from  "mongoose";

const user_schema = new mongoose.Schema({

    username: {type: String, required : true , unique:true},
    password: {type: String, minlength: 8 , required:true},
    email: {type: String, required: true},
    followers: [],
    postsID: []
});


export default mongoose.model("user" , user_schema);