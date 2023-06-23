import { useEffect, useState } from "react"
import axios from "axios"
import { getUserID } from "../hooks/getUserID"
import { useCookies } from "react-cookie"

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,_] = useCookies(["access_token"])
    const [filter, setFilter] = useState([]);

  
    const userID = getUserID();
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get("http://localhost:3001/recipes");
          setRecipes(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchRecipes();

      if(cookies.access_token){
      fetchSavedRecipes()
      }
    }, []);
  
    const saveRecipe = async (recipeID) => {
      try {
        const response = await axios.put("http://localhost:3001/recipes", {
          recipeID,
          userID,
        }, {headers: {authorization: cookies.access_token}});
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };
  
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    const handleFilter = (event) => {
      const value =event.target.value
      setFilter(value)
  }

    return(
    <div>
        <h1>Przepisy</h1>
        <h3>Wyszukaj przepis:</h3>
        <input
            type="text"
            id="author"
            name="author"
            value={filter}
            onChange={handleFilter}
          />
        <ul>
            {recipes.filter(recipe => (recipe.name).includes(filter)).map(recipe => (
                <li key={recipe._id} className="przepis">
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name}></img>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <p>Czas przygotowania: {recipe.cookingTime} (min)</p>
                    <p>Autor: {recipe.author}</p>
                    {userID != null ?
                    <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Zapisany przepis" : "Zapisz przepis"}
                         </button>
                         : <></>
                    }
                    <h3>Komentarze:</h3>
                    <p>{recipe.comment[0]}</p>
                    <p>{recipe.comment[1]}</p>
                    <p>{recipe.comment[2]}</p>
                    <p>{recipe.comment[3]}</p>
                    <p>{recipe.comment[4]}</p>
                </li>
            ))}
        </ul>
    </div>
    )
}