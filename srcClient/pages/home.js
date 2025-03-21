import { useState , useEffect } from "react"
import axios from "axios"
import { UseGetUserID } from "../Hooks/UseGetUserID"
import { useCookies } from "react-cookie";

export const Home = () => {

  const [recipes,setRecipes] = useState([]);
  const [savedRecipe , setSavedRecipe] = useState([])
  const UserID = UseGetUserID();
  const [cookies, _] = useCookies(["access_token"])


   useEffect(()=>{
    
    const fetchRecipes = async()=>{    
    
      try {
        const response = await axios.get("http://localhost:3001/recipes")
        setRecipes(response.data)
      } catch (error) {
        console.error(error)
      }

    }

    const fetchsavedRecipes = async ( ) => {
      const response = await axios.get(`http://localhost:3001/recipes/savedrecipes/ids/${UserID}`)
      setSavedRecipe(response.data.savedrecipe)
    }

    fetchRecipes();
    if(cookies.access_token)fetchsavedRecipes();

   },[])

   const savingRecipes = async (recipeID) => {

    const response = await axios.put("http://localhost:3001/recipes",
    {recipeID,UserID},
    {headers : { authorization : cookies.access_token}})
    
    setSavedRecipe(response.data.savedrecipe);
  
  }

  //  console.log(recipes)
  console.log(savedRecipe)

  const isRecipeSaved =(recipeId)=>savedRecipe?.includes(recipeId) 

  return(
    <div className="recipes_home">
      <h1>Recipes</h1>
      <ul >
        {recipes.map((recipes)=>{
          return(
            <li key={recipes._id} >
              { savedRecipe.includes(recipes._id) && <h1>Already Saved</h1> }
             <div>
              <h2>{recipes.name}</h2>
             </div>
             <div className="instructions">
             <button onClick={()=>savingRecipes(recipes._id)} 
             disabled={(!cookies.access_token)||(isRecipeSaved(recipes._id))} 
             >
              { isRecipeSaved(recipes._id) ? "Saved" : "Save"}
              </button>
              <p>{recipes.instructions}</p>
             </div>
             <img src={recipes.imageURL} 
             alt="recipe_image"
              />
             <p>Cooking Time {recipes.cookingTime} (minutes) </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}