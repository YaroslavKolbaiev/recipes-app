/* eslint-disable react/prop-types */
import React from 'react';
import { FirebaseAuthService } from '../FirebaseAuthService';

export const HeaderBlock = ({ user }) => {
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
            welcome
            {' '}
            {user.email}
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
