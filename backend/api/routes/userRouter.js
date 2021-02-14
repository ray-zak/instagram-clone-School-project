import express from "express";
//import Register_user_schema from "../../DBmodels/Register_user_schema";       // importing Register-user-Schema
import user from "../../DBmodels/Register_user_schema.js";                      // importing the user object (schema)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const router = express.Router();

router.get("/",(req, res)=>{

    res.send(" hello user ");
})


// Register Endpoint

router.post("/register" , async (req , res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        // Followers and posts should be initially blank, not provided by API
        // const followers = req.body.followers
        // const postsID = req.body.postsID;
        const followers = [];
        const postsID = [];


        //console.log(email , password, username , followers , postsID);

        // validation

        if (!email || !password || !username) {
            return res.status(400).json({msg: "Required Fields must not be blank"});
        }

        if (password.length < 8 ) {
            return res.status(400).json({msg: "Password is too short"});
        }
        // checking if there is an existing user with the same email and username
        const checking_existing_user_email = await user.findOne({email: email });   // checking the user in the database to find if there is an existing email address & username
        const checking_existing_user_username = await user.findOne({username:username});
        if(checking_existing_user_email!=null || checking_existing_user_username!=null){
            return res.status(400).json({msg: "An existing account with the same email address/username already exists"});
        }
        // hashing the password
        const salt  = await bcrypt.genSalt(8);                          // creating the salt for hashing
        const password_hash = await  bcrypt.hash(password,salt);        // hash the pasword
        console.log(password_hash);



        //TODO: probably shouldn't return all this info after a registration - an OK message would be fine
        const new_user = new user({                                  // creating the user_schema_object
            username: username,
            password: password_hash,
            email: email,
            followers: followers,
            postsID: postsID

        });

        const saved_user = await new_user.save();                    // saving the user in the database
        console.log(saved_user);
        res.json(saved_user);            // returning the user to the frontend

    }


    catch (err){
        res.status(500).json({ Error: err.message});
    }

});


// Login Endpoint 
router.post("/login" , async(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        // validate

        if(!username || !password){
            return res.status(400).json({msg: "Username or password is empty "});
        }

        // looking for the existing user in DB
        const finding_user = await user.findOne({username: username}) ;
        console.log(finding_user);

        if(!finding_user){
            return res.status(400).json({msg: "No user matches this username "});
        }

        // comparing the typed password with the hashed one in the database
       const matching_pass = await bcrypt.compare(password , finding_user.password);

        // checking if the password does not  matche
        if(!matching_pass){
            return res.status(400).json({msg: "Invalid Password"});
        }

        //console.log("before jwt line");
        // JWT token :  gives every logged in user a unique token that will be helpful for us to identify the user and use it if it is logged in or not
        const token = jwt.sign({id: finding_user._id} , process.env.JWT_SECRET);

        //console.log("after jwt line");

        res.json({
            token,
            username: finding_user.username,
            email: finding_user.email,
            id: finding_user._id

        })


    }
    catch(err){
        res.status(500).json({Error: err.message});
        //console.log(err);
    }
})


// Delete Endpoint

router.delete("/delete" , (res,req)=>{

})

export default router;


