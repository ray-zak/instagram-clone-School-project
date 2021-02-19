import express from "express";
import Image from "../../DBmodels/image_upload_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../../DBmodels/post.js";
import User from "../../DBmodels/Register_user_schema.js";
import "../auth.js";

//require function is not working
//const auth = require('../../helpers/auth.');

export const router = express.Router();

//TODO: check auth before any actions

//TODO: delete testing routes

//TODO: POST PHOTO Provides route that takes (token, caption, image bytes) and
//  - uploads the photo to Amazon S3 and gets the link
//  - creates the mongo database entry with (userID, caption, empty comments array, image URL)


//TODO: GET PHOTO POST: Provides route to return post with photo, caption, comments, user ID of user that posted


//TODO: limit photo upload size to 10MB

router.get("/",(req, res)=>{

    res.send(" hello profile!");
})

//not working because auth is not working, need syntax help
//router.get('/create-post', auth, (req,res) =>{

//})

router.get('/all-posts', (req,res) => {
    Post.find().sort({createdAt: -1})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.post('/add-post', (req,res) => {
    const {caption,imageURL} = req.body;

    //need to make this middleware, express session, passport?
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET,(err,payload) => {
        if(err){
            return res.status(401).json({error: "you must be logged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata => {
            req.user = userdata
            //const name = userdata.username;
            //const id = userdata._id;
            console.log(_id);
        })
    })

    //req.user is the user object but is returning undefined because the request takes time, need middleware to fix, don't know how
    console.log(req.user)
    res.send("ok")

    //create new post with Post schema
    /*
    const post = new Post({
        caption: caption,
        imageURL: imageURL,
        postedBy: req.user
    })
    //save post
    post.save().then(result =>{
        res.json({post:result})
        //res.send(result)
    }).catch((err) => {
        console.log(err);
    });
    */
})


//when the 'profile' button is clicked, the user's ObjectId (id from Mongodb) is put onto url path
//check this, not sure about render syntax
//not sure how to test this

router.get('posts/:id', (req,res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(result => {
            //res.render('theView', { post: result});
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
})

//test to get a post with a hardcoded userObjectId of a post in mongodb
router.get('/single-post', (req,res) => {
    Post.findById('60272a128e7f923eb808ff8d')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})


// Delete Endpoint

router.delete("/delete" , (res,req)=>{

})



export default router;

