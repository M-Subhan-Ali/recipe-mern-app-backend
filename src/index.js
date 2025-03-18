import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.routes.js"; 
import { Recipe_Router } from "./routes/recipes.routes.js";

const app= express();

app.use(express.json());
app.use(cors())


app.use("/auth",userRouter)
app.use("/recipes" , Recipe_Router )

mongoose.connect("mongodb+srv://recipebackend:mernrecipe4321@recipe-app.johwy.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=recipe-app")

app.listen(3001,()=>{
   console.log("Server is running on port")
  });