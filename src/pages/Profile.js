import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clearEmail, getEmail } from '../services/userStorage';

function Profile() {
  const { email } = getEmail();
  const history = useHistory();

  const handleDone = () => {
    history.push('/done-recipes');
  };
  const handleFavorite = () => {
    history.push('/favorite-recipes');
  };
  const handleLogout = () => {
    clearEmail();
    history.push('/');
  };
  return (
    <div>
      <Header />
      <div className="profile">
        <h3 data-testid="profile-email">
          {email}
        </h3>
        <nav className='profile-nav-container'>
          <p>Navigate to:</p>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ handleDone }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ handleFavorite }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </nav>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
