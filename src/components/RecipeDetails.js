import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import ShareAndFavorite from './ShareAndFavorite';
import StartRecipeBtn from './StartRecipeBtn';

function RecipesDetails() {
  const { location: { pathname } } = useHistory();
  const { setSelectedRecipe,
    selectedRecipe,
    setSuggestions,
    suggestions,
    getRecipeIngredients,
    ingredients,
    getRecipeIngredientsMeasures,
    measures } = useContext(AppContext);

  const seis = 6;
  const sixSuggestions = suggestions.slice(0, seis);

  const idOfMeal = pathname.replace('/meals/', '');
  const idOfDrink = pathname.replace('/drinks/', '');

  const getyoutubeParam = 32;

  useEffect(() => {
    const fetchDetail = async () => {
      const detailsMealsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idOfMeal}`;
      const detailsDrinksEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idOfDrink}`;
      let response;
      let key;
      if (pathname === `/meals/${idOfMeal}`) {
        response = await fetch(detailsMealsEndPoint);
        key = 'meals';
      } else {
        response = await fetch(detailsDrinksEndPoint);
        key = 'drinks';
      }
      const data = await response.json();
      setSelectedRecipe(data[key]);
      getRecipeIngredients(data[key]);
      getRecipeIngredientsMeasures(data[key]);
    };
    fetchDetail();
  }, [pathname,
    setSelectedRecipe,
    idOfMeal,
    idOfDrink,
    getRecipeIngredients,
    getRecipeIngredientsMeasures]);

  useEffect(() => {
    const fetchSuggestion = async () => {
      const sugMealsEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const sugDrinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      let response;
      let key;
      if (pathname === `/meals/${idOfMeal}`) {
        response = await fetch(sugDrinksEndPoint);
        key = 'drinks';
      } else {
        response = await fetch(sugMealsEndPoint);
        key = 'meals';
      }
      const data = await response.json();
      setSuggestions(data[key]);
    };
    fetchSuggestion();
  }, [idOfDrink, idOfMeal, pathname, setSuggestions]);

  return (
    <div>
      <div>
        <h2 className="recipe-page-title">Recipe Details</h2>
        <div className='recipes-details-container'>
          {
            selectedRecipe.map((recipe) => (
              <div key={ recipe.idMeal ? recipe.idMeal : recipe.idDrink } className='done-recipe-card'>
                <h3
                  data-testid="recipe-title"
                >
                  { recipe.strMeal ? recipe.strMeal : recipe.strDrink }
                </h3>
                <img
                  className="img-recipe-details"
                  src={ recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb }
                  alt="recipe"
                  data-testid="recipe-photo"
                  width="80%"
                />
                <ShareAndFavorite />
                <p data-testid="recipe-category">
                  {
                    recipe.strAlcoholic
                      ? `${recipe.strCategory} ${recipe.strAlcoholic}`
                      : recipe.strCategory
                  }
                </p>
              </div>
            ))
          }
        </div>

        <h3 className='ingredients-title'>Ingredients:</h3>
        <div className="ingredients">
          {
            ingredients.map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${index}-${ingredient}` }
              >
                {`${ingredient}: ${measures[index]}`}

              </p>
            ))
          }
        </div>

        <h3 className='ingredients-title'>Intructions:</h3>
        {
          selectedRecipe.length > 0 && (
            <p
              data-testid="instructions"
              className="instructions"
            >
              {selectedRecipe[0].strInstructions}
            </p>
          )
        }

        {
          (selectedRecipe.length > 0 && selectedRecipe[0].strYoutube) && (
            <iframe
              className="movie-yt"
              data-testid="video"
              // width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${selectedRecipe[0].strYoutube.slice(getyoutubeParam)}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture"
              allowFullScreen
            />
          )
        }
      </div>
      <div className="carousel">
        {
          sixSuggestions.map((e, i) => (
            <div
              className="suggestions"
              key={ e.idMeal ? e.idMeal : e.idDrink }
              data-testid={ `${i}-recommendation-card` }
            >
              <img
                className="imgSuggestion"
                src={ e.strMealThumb
                  ? e.strMealThumb
                  : e.strDrinkThumb }
                alt={ e.strMeal ? e.strMeal : e.strDrink }
              />
              <h2
                data-testid={ `${i}-recommendation-title` }
              >
                {e.strMeal ? e.strMeal : e.strDrink}
              </h2>
            </div>
          ))
        }
      </div>
      <StartRecipeBtn />
    </div>
  );
}
export default RecipesDetails;
