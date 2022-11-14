import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contextApi/AppContext';

function SearchBar() {
  const { handleSearchChange, handleClickApi } = useContext(AppContext);
  const { location: { pathname } } = useHistory();
  return (
    <div className="searchBar">
      <div className="search-btn-container">
        <input
          data-testid="search-input"
          type="text"
          name="valueToSearch"
          placeholder='Search...'
          onChange={ handleSearchChange }
        />
        <div className='search-inputs'>
          <label htmlFor="ingredientes">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredientes"
              name="option"
              id="ingredientes"
              onChange={ handleSearchChange }
            />
            Ingredients
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              data-testid="name-search-radio"
              value="name"
              name="option"
              id="name"
              onChange={ handleSearchChange }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              value="primeiraLetra"
              data-testid="first-letter-search-radio"
              name="option"
              id="first-letter"
              onChange={ handleSearchChange }
            />
            First Letter
          </label>
        </div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ () => handleClickApi(pathname) }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
