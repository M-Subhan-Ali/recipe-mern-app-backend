import { Router } from "express";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async(req,res)=>{
  
  const { username , password}=req.body;
  
  const existedUser = await User.findOne({username});
  
  if(existedUser){
    return res.status(400).json({message:"Username ALready Registered"})
  }

  const hashedPassword = await bcrypt.hash(password,10)
  
  const newUser = await User.create({
    username,
    password:hashedPassword,
  })

  await newUser.save();

  return res.status(200).json({
    message:"User Successfully Registered!"
   })


})

router.post("/login", async( req,res )=>{

  const {username , password} = req.body;

  const existedUser = await User.findOne( {username} );

  if( !existedUser ){
    return res.status(400).json({message : "Username not Found !"})
  }

  const PasswordCorrect = await bcrypt.compare( password , existedUser.password );

  if(!PasswordCorrect){
    return res.status(400).json({message : "Password or Username is incorrect"})
  }

  const loggedIn = await User.findById(existedUser._id).select("-password")

  const token = jwt.sign({
    _id : loggedIn._id,
    username : loggedIn.username,  
  },"SECRET");
  
  return res.status(200).json({
    message : "User Login Successfully!",
    UserID:loggedIn._id,
    token,
    // loggedIn
  })
  


})

export const verifyJWT = (req , res , next) => {
  
  const authHeader = req.headers.authorization;
  if(authHeader){
    jwt.verify(authHeader , "SECRET" , (err)=>{
      if(err){
        return res.status(401).json({message : "Invalid Token!"})
      }
    } )
    next()
  }else{
    return res.status(401).json({message : "No Token Provided!"})
  }

}

export {router as userRouter}