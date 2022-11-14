import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoneRecipes } from '../services/doneStorage';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [hasCopy, setHasCopy] = useState(false);

  const updateDoneRecipes = useCallback(() => {
    const recipesDone = getDoneRecipes('doneRecepies');
    if (recipesDone !== null) {
      setDoneRecipes(recipesDone);
      setFilteredDoneRecipes(recipesDone);
    }
  }, []);

  const filterbyType = useCallback((type) => {
    let updateFilter;
    if (type === 'meals') {
      updateFilter = doneRecipes.filter((recipe) => recipe.type === 'meal');
      console.log(updateFilter);
    } else if (type === 'drinks') {
      updateFilter = doneRecipes.filter((recipe) => recipe.type === 'drink');
      console.log(updateFilter);
    } else {
      updateFilter = [...doneRecipes];
    }
    setFilteredDoneRecipes(updateFilter);
  }, [doneRecipes]);

  const getCopiedLink = (page, recipeId) => {
    copy(`http://localhost:3000/${page}s/${recipeId}`);
    setHasCopy(true);
  };

  useEffect(() => {
    updateDoneRecipes();
  }, [updateDoneRecipes]);

  return (
    <div>
      <Header />
      <div className='done-recipes-filter'>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterbyType }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterbyType('meals') }
        >
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterbyType('drinks') }
        >
          Drinks
        </button>
      </div>
      <div className='done-recipes-container'>
        { filteredDoneRecipes.length === 0 && <p>No recipe has been done yet...</p>}
        {(filteredDoneRecipes.length > 0) && filteredDoneRecipes.map((e, index) => (
          <div key={ e.id } className='done-recipe-card'>
            <Link to={ `/${e.type}s/${e.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {e.name}
              </h3>
              <img
                src={ e.image }
                data-testid={ `${index}-horizontal-image` }
                alt="recipe"
                width="300px"
                className='profile-img-recipe'
              />
            </Link>
            <button
              type="button"
              onClick={ () => getCopiedLink(e.type, e.id) }
              className='profile-fav-btn'
            >
              <img
                src={ shareIcon }
                alt="shareBtn"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {
              e.type === 'meal'
                ? (
                  <h4 data-testid={ `${index}-horizontal-top-text` }>
                    {`${e.nationality} - ${e.category}`}
                  </h4>
                )
                : (
                  <h4 data-testid={ `${index}-horizontal-top-text` }>
                    {`${e.category} - ${e.alcoholicOrNot}`}
                  </h4>
                )
            }
            {
              (e.tags.filter((_tag, indiceTag) => indiceTag < 2)
                .map((tag) => (
                  <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
                    {tag}
                  </p>
                )))
            }
            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Done Date: ${e.doneDate}`}
            </p>
          </div>
        ))}
      </div>
      {
        hasCopy && (
          <div>
            <p>Link copied!</p>
            <button type="button" onClick={ () => setHasCopy(false) }>Ok</button>
          </div>
        )
      }
    </div>
  );
}

export default DoneRecipes;
