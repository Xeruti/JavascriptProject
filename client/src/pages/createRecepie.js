import { useState } from "react"
import axios from 'axios'
import { getUserID } from "../hooks/getUserID"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"


export const CreateRecepie= () => {
    const userID = getUserID()
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe,SetRecipe] = useState({
        name:"",
        ingredients:[],
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userID,
        author:""
    })

    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name,value} =event.target
        SetRecipe({...recipe, [name]: value})
    }

    const handleIngredientChange = (event,index) => {
        const {value} =event.target
        const ingredients = recipe.ingredients
        ingredients[index] = value
        SetRecipe({...recipe, ingredients})
    }

    const handleAddIngredient = () => {
        SetRecipe({...recipe, ingredients: [...recipe.ingredients,""]})
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post(
          "http://localhost:3001/recipes",
          { ...recipe },
          {
            headers: { authorization: cookies.access_token },
          }
        );
  
        alert("Dodano nowy przepis")
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <div className="create-recipe">
        <h2>Dodaj nowy przepis</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nazwa:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Opis:</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="ingredients">Składniki:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              id="ingredients"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Dodaj składnik
          </button>
          <label htmlFor="instructions">Instrukcje:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="imageUrl">Zdjęcie:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="cookingTime">Czas przygotowania (minuty)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            name="author"
            value={recipe.author}
            onChange={handleChange}
          />
          <button type="submit">Dodaj przepis</button>
        </form>
    </div>
    )
}