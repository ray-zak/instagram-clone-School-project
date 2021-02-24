import express from "express";
// import Image from "../../DBmodels/image_upload_schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../../DBmodels/post_schema.js";
import User from "../../DBmodels/Register_user_schema.js";
//import auth from "../../helpers/auth.js"
import AWS from 'aws-sdk';
import FileType from 'file-type';
import multiparty from 'multiparty';
import fs from 'fs';
import dotenv from "dotenv";
import authMiddleware from "../../api/authMiddleware.js";



dotenv.config();
export const router = express.Router();

// init AWS instance
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ca-central-1' // us-east-1 for me
});

// init s3 instance
const s3 = new AWS.S3();


//TODO: delete testing routes


//TODO: limit photo upload size to 10MB

router.get("/", (req, res) => {

    res.send(" hello post router!");
})



router.post('/upload-image', async (req, res) => {

    const form = new multiparty.Form();
    // parse form data
    form.parse(req, async (error, fields, files) => {
        if (error) {
            return res.status(500).send(error);
        };
        try {
            // get params data
            const path = files.file[0].path;
            const buffer = fs.readFileSync(path);
            const type = await FileType.fromBuffer(buffer);
            const fileName = `image/${files.file[0].originalFilename}`;
            const params = {
                ACL: 'public-read',
                Body: buffer,
                Bucket: process.env.S3_BUCKET,
                ContentType: type.mime,
                Key: fileName,
            };
            // upload image to s3
            const data = await s3.upload(params).promise()
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send(err);
        }
    });
})



router.get('/all-posts', authMiddleware, async (req, res) => {
    Post.find({postedBy: req.user}).sort({ createdAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        const { caption, imageURL } = req.body;
        /**
        //need to make this middleware, express session, passport?
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "you must be logged in" })
            }
            const { _id } = payload
            User.findById(_id).then(userdata => {
                req.user = userdata
                //const name = userdata.username;
                //const id = userdata._id;
                console.log(_id);
            })
        })
        **/
        //req.user is the user object but is returning undefined because the request takes time, need middleware to fix, don't know how
        console.log(req.user)


    //create new post with Post schema

        const post = new Post({
            caption: caption,
            imageURL: imageURL,
            postedBy: req.user,
            comments: [],
        })
        console.log(post)
        //save post
        await post.save()
        //adding the post id to the user's posts array
        await req.user.postsID.push(post._id)
        await req.user.save();
        res.json({ post })

    }
    catch(err) {
        res.status(500).json({Error: err.message});
        //console.log(err);
    }

})

//gets all posts by all users sorted by most recent. Not really tested yet
router.get('/all-posts', authMiddleware ,(req,res) => {

    console.log('hello');


    Post.find()
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then((posts)=>{
            res.json({posts})
        }).catch(err=>{
        console.log(err)
    })

})

//get all posts made by a user (the user who is logged in)
router.get('/my-post',authMiddleware,(req,res)=>{

    Post.find({postedBy:req.user._id})
        .populate("PostedBy","_id name")
        .then(my_post=>{
            res.json({my_post})
            console.log(my_post)
        })
        .catch(err=>{
            console.log(err)
        })
})


//Not finished, not exactly sure what this is doing but kept it for now
router.get('posts/:id', authMiddleware, async (req,res) => {
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





// Delete Endpoint

router.delete("/delete", (res, req) => {

})



export default router;



