import s from './Appbar.module.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';

function Appbar() {
  return (
    <div className={s.appbar}>
      <Navigation />
    </div>
  );
}

export default Appbar;
