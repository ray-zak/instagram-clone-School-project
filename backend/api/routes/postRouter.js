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
import Comment from "../../DBmodels/Comment_Schema.js";



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
    //console.log("upload image called")
    const form = new multiparty.Form();
    // parse form data
    form.parse(req, async (error, fields, files) => {
        if (error) {
            //console.log("Parse error, Form: ", form)
            return res.status(500).send(error);
        };
        try {
            // get params data
            //console.log("in try block", files)
            const path = files.file[0].path;
            //console.log("in try block 2")
            const buffer = fs.readFileSync(path);
            const type = await FileType.fromBuffer(buffer);
            const fileName = `image/${files.file[0].originalFilename}`;
            //console.log("upload image with fileName ", fileName);
            const params = {
                ACL: 'public-read',
                Body: buffer,
                Bucket: process.env.S3_BUCKET,
                ContentType: type.mime,
                Key: fileName,
            };
            // upload image to s3
            //console.log("just before s3 upload")
            const data = await s3.upload(params).promise()
            return res.status(200).send(data);
        } catch (err) {
            //console.log("Try error, Form: ", form)
            console.log("Try post error ", err)
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

        //req.user is the user object but is returning undefined because the request takes time, need middleware to fix, don't know how
        //console.log(req.user)


    //create new post with Post schema

        const post = new Post({
            caption: caption,
            imageURL: imageURL,
            postedBy: req.user,
            comments: [],
        })
        //console.log(post)
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
// router.get('/all-posts', authMiddleware ,(req,res) => {
//
//     console.log('hello');
//
//
//     Post.find()
//         .populate("postedBy","_id name")
//         .populate("comments.postedBy","_id name")
//         .sort('-createdAt')
//         .then((posts)=>{
//             res.json({posts})
//         }).catch(err=>{
//         console.log(err)
//     })
//
// })

//get all posts made by a user (the user who is logged in)
// router.get('/my-post',authMiddleware,(req,res)=>{
//
//     Post.find({postedBy:req.user._id})
//         .populate("PostedBy","_id name")
//         .then(my_post=>{
//             res.json({my_post})
//             console.log(my_post)
//         })
//         .catch(err=>{
//             console.log(err)
//         })
// })


//getting otheruser's post
router.get("/otheruser_posts/:UserID", authMiddleware, async (req,res) => {
    User.findById(req.params.UserID)
        .then(user=>{

            Post.find({postedBy: user})
                .then(result=>{
                    res.send(result)
                })
                .catch(err=>{
                    res.status(400).json(err.message);
                })
        })
        .catch(err=>{
            res.status(400).json(err.message);
        })

})

router.post("/add-comment" , authMiddleware , async(req,res)=>{
    try{
        const content = req.body.content;
        console.log(content)
        const postedBy = req.user.username;
        const postId = req.body.postId;
        console.log(postId);

        const newcomment = new Comment({
            content: content,
            postedBy: postedBy,
            postID: postId
        })
        await newcomment.save()
        await Post.findById(postId).updateOne({$push:{comments: newcomment}})
        res.json({newcomment: newcomment});

    }
    catch (err){
        res.status(500).json(err.message);
    }


})

router.get("/getcomment", authMiddleware, async (req, res)=>{
    await Comment.find().sort({createdAt: -1})
        .then(result=>{
            res.send(result)
        })
        .catch(err=>{
            res.json(err.message);
        })
})




// Delete Endpoint

router.delete("/delete", (res, req) => {

})



export default router;



