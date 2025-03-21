import axios from "axios";
import { useEffect, useState } from "react"
import { UseGetUserID } from "../Hooks/UseGetUserID";


export const Saved_recipe = () => {
    
  const [recipes , setRecipes] = useState([]);
  const UserID = UseGetUserID(); 


  useEffect(()=>{

    const fetchSavedRecipes = async()=>{
    const response = await axios.get(
    `http://localhost:3001/recipes//savedRecipes/${UserID}`)
  
    setRecipes(response.data)
 
  }

  fetchSavedRecipes()

    
  },[])
  // console.log(recipes)
  return(
    <div className="recipes_home">
      <h1>Recipes</h1>
      <ul>
        {
          recipes.map((recipes)=>{
            return(
              <li key={recipes._id}>
             <div>
              <h2>{recipes.name}</h2>
             </div>
             <div className="instructions">
              <p>{recipes.instructions}</p>
             </div>
             <img src={recipes.imageURL} 
             alt="recipe_image"
              />
             <p>Cooking Time {recipes.cookingTime} (minutes) </p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}