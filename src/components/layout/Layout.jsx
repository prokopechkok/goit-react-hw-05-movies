import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Loader } from 'components/loader/Loader';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul className={css.headerNav}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${css.headerLink} ${isActive ? css.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `${css.headerLink} ${isActive ? css.active : ''}`
                }
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={css.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default Layout;
