/* eslint-disable react/prop-types */
import React from 'react';
import { FirebaseAuthService } from '../FirebaseAuthService';

export const HeaderBlock = ({ user, lang }) => {
  function handleLogOut() {
    FirebaseAuthService.logOutUser();
  }

  return (
    <div className="
      is-flex
      is-justify-content-space-around
      is-align-items-end
      "
    >
      <div>
        {user
          && (
          <div>
            {lang === 'UA' && 'Ласкаво Просимо'}
            {lang === 'EN' && 'Welcome'}
            {' '}
            <span className='has-text-warning-dark'>{user.email}</span>
            <button
              type="button"
              className="header-button"
              onClick={handleLogOut}
            >
              <span className="icon is-small">
                <i className="
                  fa-solid
                  fa-arrow-right-from-bracket
                  has-text-dark"
                />
              </span>
            </button>
          </div>
          )
        }
      </div>
    </div>
  );
};
