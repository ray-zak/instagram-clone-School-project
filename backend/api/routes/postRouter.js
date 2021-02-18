import express from "express";
import Post from "../../DBmodels/post_schema.js";
import authMiddleware from "../../api/authMiddleware.js";



export const router = express.Router();

//TODO: check auth before any actions
//TODO: delete testing routes

//TODO: POST PHOTO Provides route that takes (token, caption, image bytes) and
//  - uploads the photo to Amazon S3 and gets the link
//  - creates the mongo database entry with (userID, caption, empty comments array, image URL)


//TODO: GET PHOTO POST: Provides route to return post with photo, caption, comments, user ID of user that posted


//TODO: limit photo upload size to 10MB

router.get("/",(req, res)=>{

    res.send(" hello post router!");
})


//create a new post
router.post('/addPost', authMiddleware, async (req,res) => {

    try {
        const {caption,imageURL} = req.body;

        console.log(req.user);
        //res.send("ok")

        //can set password to undefined so it is not stored in post
        //req.user.password = undefined

        //create new post with Post schema
        const post = new Post({
            caption: caption,
            imageURL: imageURL,
            postedBy: req.user
        });

        const saved_post = await post.save();
        console.log(saved_post);
        res.json(saved_post);

    }
    catch(err) {
        res.status(500).json({Error: err.message});
        //console.log(err);
    }

});

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


//Not finished, not exactly sure what this is doing but kept it for now
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





// Delete Endpoint

router.delete("/delete" , (res,req)=>{

})



export default router;

