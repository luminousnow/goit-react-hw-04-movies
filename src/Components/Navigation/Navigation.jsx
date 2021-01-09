import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import s from './Navigation.module.css';

function Navigation() {
  return (
    <Menu>
      <Menu.Item>
        <NavLink
          to="/"
          exact
          className={s.menuItem}
          activeClassName={s.activeMenuItem}
        >
          Home
        </NavLink>
      </Menu.Item>

      <Menu.Item>
        <NavLink
          to="/movies"
          className={s.menuItem}
          activeClassName={s.activeMenuItem}
        >
          Movies
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default Navigation;
