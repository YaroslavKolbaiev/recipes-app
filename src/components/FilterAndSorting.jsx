export const FilterAndSorting = ({ 
  query,
  handleQueryChange,
  handleSearchMemory,
  orderBy,
  setOrderBy,
}) => {
  return (
  <div className='filtering-row'>
    <div className='field'>
      <label className='label'>Find Memory</label>
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
          Search
        </button>
      </div>
    </div>
    <div className='field'>
      <label className='label'>Sort Memories</label>
      <div className='control'>
        <div className="select">
          <select
          className='has-background-warning-light'
            value={orderBy}
            onChange={(event) => {
              setOrderBy(event.target.value);
            }}
          >
            <option value="">Sort By</option>
            <option value="publishDateDesc">Desc</option>
            <option value="publishDateAsc">Asc</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );
};