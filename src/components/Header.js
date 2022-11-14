import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../contextApi/AppContext';
import SearchBar from './SearchBar';

function Header() {
  const { searchBtn, showsearchBtn } = useContext(AppContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const pageTitle = pathname.replace('/', '').replace('-', ' ').split(' ');

  return (
    <header className="header">
      <div className='header-content'>
        {
          (pathname === '/drinks' || pathname === '/meals') && (
            <button type="button" onClick={ showsearchBtn } className="lupa">
              <img src={ searchIcon } alt="seacrh" data-testid="search-top-btn" />
            </button>
          )
        }
        <h2 data-testid="page-title">
          {
            pageTitle.map((str) => (`${str[0].toUpperCase() + str.substring(1)} `))
          }
        </h2>
        <Link to="/profile">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
      </div>
      {
        searchBtn && <SearchBar />
      }
    </header>
  );
}

export default Header;
