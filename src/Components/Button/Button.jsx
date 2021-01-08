import s from './Button.module.css';

function Button({ onLoadMoreBtnClick, status }) {
  return (
    <div className={s.button__box}>
      <button onClick={onLoadMoreBtnClick} className={s.button} type="button">
        Load more ...
      </button>
    </div>
  );
}

export default Button;
