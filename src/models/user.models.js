import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type : String,
    required: true,
    unique:true
  },
  password:{
    type : String,
    required: true
  },
  savedrecipe:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Recipe"
  }]
},
  {timestamps: true})

export const User = mongoose.model( "User" , userSchema );  