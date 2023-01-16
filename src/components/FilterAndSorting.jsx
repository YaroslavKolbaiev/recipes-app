import classNames from "classnames";
import { startTransition, useRef, useState } from "react";

export const FilterAndSorting = ({ 
  query,
  handleQueryChange,
  handleSearchMemory,
  // orderBy,
  setOrderBy,
  lang
}) => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const langSelector = (ua, en) => {
    if (lang === 'UA') {
      return ua;
    }

    if (lang === 'EN') {
      return en
    }
  }
  const [sortType, setSortType] = useState(langSelector('Відсортувати', 'Sort by Date'));
  const idDesc = useRef();
  const idAsc = useRef();
  return (
  <div className='is-flex-tablet'>
    <div className='field mb-0 mr-3'>
      <label className='label'>
        {lang === 'UA' && 'Знайти Cпогад'}
        {lang === 'EN' && 'Find Memory'}
      </label>
      <div className='control level is-mobile'>
        <input 
          value={query}
          className='input has-background-warning-light'
          onChange={handleQueryChange}
        />
        <button 
          type='button'
          onClick={handleSearchMemory} 
          className='button is-dark'
        >
          {lang === 'UA' && 'Знайти'}
          {lang === 'EN' && 'Search'}
        </button>
      </div>
    </div>
    {/* <div className='field'>
      <label className='label'>
        {lang === 'UA' && 'Дата'}
        {lang === 'EN' && 'Date'}
      </label>
      <div className='control'>
        <div className="select">
          <select
            className='has-background-warning-light'
            defaultValue={orderBy}
            onChangeCapture={(event) => {
              setOrderBy(event.target.value);
            }}
          >
            <option value="">
              {lang === 'UA' && 'Виберіть'}
              {lang === 'EN' && 'Sort by'}
            </option>
            <option value="publishDateDesc">
              {lang === 'UA' && 'За спаданням'}
              {lang === 'EN' && 'Desc'}
            </option>
            <option value="publishDateAsc">
              {lang === 'UA' && 'За зростанням'}
              {lang === 'EN' && 'Asc'}
            </option>
          </select>
        </div>
      </div>
    </div> */}
    <div className={classNames(
      'dropdown is-felx is-align-items-flex-end',
      {'is-active': dropdownIsActive})}
    >
      <div className="dropdown-trigger">
        <button 
          className="button has-background-warning-light"
          type="button"
          aria-haspopup='true'
          aria-controls="dropdown-menu"
          onClick={() => {
            setDropdownIsActive(!dropdownIsActive);
          }}
        >
          <span>
            {/* {langSelector('Сортування за датою', 'Sort by Date')} */}
            {sortType}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        id="dropdown-menu"
        className="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content has-background-warning-light">
          <a
            className="dropdown-item"
            onClick={() => {
              startTransition(() => {
                setOrderBy('');
                setSortType(langSelector('Відсортувати', 'Sort by Date' ));
                setDropdownIsActive(!dropdownIsActive);
              });
            }}
          >
            {lang === 'UA' && 'За замовчуванням'}
            {lang === 'EN' && 'Default'}
          </a>
          <a
            ref={idDesc}
            id="publishDateDesc"
            className="dropdown-item"
            onClick={() => {
              startTransition(() => {
                setOrderBy(idDesc.current.id);
                setSortType(langSelector('За спаданням', 'Desc' ));
                setDropdownIsActive(!dropdownIsActive);
              });
            }}
          >
            {lang === 'UA' && 'За спаданням'}
            {lang === 'EN' && 'Desc'}
          </a>
          <a
            ref={idAsc}
            id="publishDateAsc"
            className="dropdown-item"
            onClick={() => {
              startTransition(() => {
                setOrderBy(idAsc.current.id);
                setSortType(langSelector('За зростанням', 'Asc' ));
                setDropdownIsActive(!dropdownIsActive);
              });
            }}
          >
            {lang === 'UA' && 'За зростанням'}
            {lang === 'EN' && 'Asc'}
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};