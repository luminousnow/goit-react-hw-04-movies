import s from './Loader.module.css';
import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoaderExampleInlineCentered = () => (
  <Loader className={s.loader} active size="massive" />
);

export default LoaderExampleInlineCentered;
