import s from './Searchbar.module.css';
import React, { useState } from 'react';
import { func } from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from 'semantic-ui-react';

function Searchbar({ getQuery, resetState, onSearchHandlerChange }) {
  const [query, setQuery] = useState('');

  const onSubmitButtonPressed = evt => {
    //   вимикає перезавантаженя форми по замовчуванні
    evt.preventDefault();

    // перевірка чи поле не є пустим
    if (query.trim() === '') {
      return toast.error('🦄 введи назву фільму і повтори пошук', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // скидає сторінку на "1" і колекцію на "[]"
    resetState();

    // передає поточний запит
    getQuery(query);
    onSearchHandlerChange(query);
  };

  // слухає Input та оновлює значення query Стейту
  const onInputHandleChange = evt => {
    setQuery(evt.target.value.toLowerCase());
  };

  return (
    <>
      <Form onSubmit={onSubmitButtonPressed} className={s.form}>
        <Input
          onChange={onInputHandleChange}
          type="text"
          placeholder="Search..."
          className={s.input}
        />
      </Form>
    </>
  );
}

Searchbar.propTypes = {
  getQuery: func.isRequired,
  resetState: func.isRequired,
};

export default Searchbar;
