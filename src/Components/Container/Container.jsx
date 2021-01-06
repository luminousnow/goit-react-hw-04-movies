import s from './Container.module.css';
import React from 'react';
import { node } from 'prop-types';

function Container({ children }) {
  return <div className={s.conteiner}>{children}</div>;
}

Container.propTypes = {
  children: node.isRequired,
};

export default Container;
