const User=require('../models/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.signup= async(req, res)=>{
    const userExists=await User.findOne({email: req.body.email});
    if(userExists){
        return res.status(403).json({error: "Email is Taken!"})
    }

    const user=await new User(req.body);
    await user.save();
    res.status(200).json({message: "Sign Up Successful! Please Login"});
}

exports.signin=(req,res)=>{

    //find user based on email id 
    const {email, password}=req.body;
    User.findOne({email}, (err, user) =>{

        //if no user 
        if (err || !user ){
            return res.status(401).json({error: "User with that email id does not exist. Please sign in"})
        }

        //check password
        if(!user.authenticate(password)){
            return res.status(401).json({error:"Invalid Password"})
        }

        //generate token 
        const token=jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        //persist the token as t in cookie with expiry date 
        res.cookie("t",token, {expire: new Date()+9999});

        //return response with user and token to front end client 
        const {_id, name, email}= user
        return res.json({token, user:{_id, name, email}})
    })
}

exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({message:"Signout Successful!"});
}