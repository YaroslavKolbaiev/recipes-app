export const FilterAndSorting = ({ 
  query,
  handleQueryChange,
  handleSearchMemory,
  orderBy,
  setOrderBy,
  lang
}) => {
  return (
  <div className='is-flex is-justify-content-space-around'>
    <div className='field'>
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
    <div className='field'>
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
    </div>
  </div>
  );
};