import { Router } from "express";
import { Recipe } from "../models/recipes.models.js";

const router = Router();

router.get("/", async ( req , res ) => {
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


router.post("/", async ( req , res )=> {
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

export {router as Recipe_Router}