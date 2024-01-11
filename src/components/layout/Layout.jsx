import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};
