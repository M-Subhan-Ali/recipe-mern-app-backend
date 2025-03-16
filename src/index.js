import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app= express();

app.use(express.json());
app.use(cors())

import { userRouter } from "./routes/user.routes.js"; 

app.use("/auth",userRouter)

mongoose.connect("mongodb+srv://recipebackend:mernrecipe4321@recipe-app.johwy.mongodb.net/recipe-app?retryWrites=true&w=majority&appName=recipe-app")

app.listen(3001,()=>{
   console.log("Server is running on port")
  });