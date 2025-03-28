import { Router } from "express";
import { Recipe } from "../models/recipes.models.js";
import { User } from "../models/user.models.js";
import { verifyJWT } from "./user.routes.js";

const router = Router();

router.get("/", async ( req , res ) => {  //home
  try {
    const response = await Recipe.find({});
    return res.status(200).json(response);
    
  } catch (error) {
    res.status(400).json({
      message: "cannot retrieve data from db",
      error : error
    })
  }
})


router.post("/", verifyJWT ,async ( req , res )=> {
  try {
     const recipe = new Recipe(req.body);
     await recipe.save();
     
     return res.status(200).json({
      recipe,
      message:"Recipe Created Successfully"}) 
  
    } catch (error) {
    res.status(400).json({
      error : error,
      message: "cannot create recipe"
    })
  }
})


router.put("/", verifyJWT ,async( req , res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeID);
    const user = await User.findById(req.body.UserID);
    
    user.savedrecipe.push(recipe);
    await user.save();
  
   return res.status(200).json({savedrecipe : user.savedrecipe})
  
  } catch (error) {

    console.error(error)
  
  }

})

router.get("/savedrecipes/ids/:UserID" , async ( req , res )=>{ // home

  try {
    const user = await User.findById(req.params.UserID);
  
    return res.status(201).json({savedrecipe : user?.savedrecipe})

  } catch (error) {
    console.error(error)
  }
})


router.get("/savedRecipes/:UserID" , async( req , res ) => {
  try {
    
    const user = await User.findById(req.params.UserID)
    
    const savedRecipe = await Recipe.find({
      _id : {$in : user.savedrecipe}
    })
  
    res.status(200).json(savedRecipe)
  
  
  } catch (error) {

    console.error(error)
  
  }

})

export {router as Recipe_Router}