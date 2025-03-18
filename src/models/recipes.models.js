import mongoose from "mongoose";

const recipes_Schema = new mongoose.Schema({
  name : {
    type: String,
    required: true ,
  },
  ingredients : [{
    type : String , 
    required : true
  }] , 
  instructions : {
    type : String , 
    required : true
  } , 
  imageURL : {
    type : String , 
    required : true
  },
  cookingTime : {
    type : Number , 
    required : true
  },
  recipeOwner : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  }
});

export const Recipe = mongoose.model("Recipe" , recipes_Schema);