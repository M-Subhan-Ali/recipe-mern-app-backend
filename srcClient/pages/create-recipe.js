import { useState } from "react"
import axios from 'axios'
import { UseGetUserID } from "../Hooks/UseGetUserID"
import {useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie"
export const Create_recipe = () => {

  const navigate = useNavigate();
  
  const UserID=UseGetUserID();
  
  const [cookies,_]=useCookies(["access_token"])

  // console.log(UserID,"hehe")
  
  const [ recipe , setRecipe ] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageURL:"",
    cookingTime:0,
    recipeOwner:UserID
  })

  const Submit = async (event) => {

    event.preventDefault();
    
    try {

      await axios.post("http://localhost:3001/recipes",recipe,{
        headers:{authorization : cookies.access_token}
      })
      alert("Created Recipe SuccessFully!")
      navigate("/")

    } catch (error) {
      console.error(error)
    }
    
  }
  
  const HandleChange = (event) => {
    const {name , value} = event.target
    setRecipe((rec)=>({...rec,[name]:value}))
  }
  
  const addIngredient = () => {
    const Ingredients = [...recipe.ingredients , ""]
    setRecipe({...recipe , ingredients : Ingredients })  //name same nai ha is liye ingredients alag alag likha ah
  }

  const handleIngredientsChange = ( event , idx ) => {

     const {value} = event.target;
     const ingredient = recipe.ingredients;
     ingredient[idx] = value ;
     setRecipe({...recipe , ingredient   })

  }
  
  // console.log(recipe)
  
  return(
    <div className="create-recipe">
     <h1>Create-Recipe</h1>
     <form onSubmit={Submit}>
      <label htmlFor="name">Name</label>
      <input type="text"  name="name" value={recipe.name} onChange={HandleChange}  />
      <label htmlFor="ingredients">ingredients</label>
      {recipe.ingredients.map((Ingredients,idx)=>{
        return <input 
        key={idx} 
        type="text" 
        name="ingredients"
        value={Ingredients}
        onChange={(event)=> handleIngredientsChange(event,idx) }  
        />
      })}
      <button onClick={addIngredient} type="button">Add Ingredients</button>
      <label htmlFor="Instructions">Instructions</label>
      <input type="text" name="instructions" value={recipe.instructions} onChange={HandleChange}  />
      <label htmlFor="imageURL">Image URL</label>
      <input type="text"  name="imageURL"  value={recipe.imageURL} onChange={HandleChange} />
      <label htmlFor="cookingTime">Cooking Times (Minutes)</label>
      <input type="number" name="cookingTime"  value={recipe.cookingTime} onChange={HandleChange}  />
      <button  type="submit">Create Recipe</button>
     </form>
    </div>
  )
}