import { useEffect, useState } from "react"
import axios from "axios"
import { getUserID } from "../hooks/getUserID"

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = getUserID()
  
    useEffect(() => {
  
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      };

      fetchSavedRecipes();
    }, []);

    return(
      <div>
      <h1>Zapisane Przepisy</h1>
      <ul>
          {savedRecipes.map((recipe) => (
              <li key={recipe._id} className="przepis">
                  <div>
                      <h2>{recipe.name}</h2>
                  </div>
                  <img src={recipe.imageUrl} alt={recipe.name}></img>
                  <div className="instructions">
                      <p>{recipe.instructions}</p>
                  </div>
                  <p>Czas przygotowania: {recipe.cookingTime} (min)</p>
              </li>
          ))}
      </ul>
  </div>
    )
}