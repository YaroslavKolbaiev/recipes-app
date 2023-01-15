export const Pagination = ({ 
  memoryPerPage,
  handleMemoriesPerPage,
  handleLoadMoreMemoriesClick,
  lang
}) => {
  const displayText = () => {
    if (lang === 'UA') {
      return 'Показати';
    };

    if (lang === 'EN') {
      return 'Display'
    };
  };
  const memoryPageText = () => {
    if (lang === 'UA') {
      return 'на сторінці';
    };

    if (lang === 'EN') {
      return 'memories on the page';
    };
  };
  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      <div className="select">
        <select
          className="has-background-warning-light"
          value={memoryPerPage}
          onChange={handleMemoriesPerPage}
        >
          <option value="">
            {lang === 'UA' && 'Вибрати кількість спогадів'}
            {lang === 'EN' && 'Chose number of memories'}
          </option>
          <option value="3">{`${displayText()} 3 ${memoryPageText()}`}</option>
          <option value="6">{`${displayText()} 6 ${memoryPageText()}`}</option>
          <option value="9">{`${displayText()} 9 ${memoryPageText()}`}</option>
        </select>
      </div>
      <div className="buttons">
        <button 
          className="button is-ghost has-text-dark" 
          type="button"
          onClick={handleLoadMoreMemoriesClick}
        >
          {lang === 'UA' && 'Показати всі спогади'}
          {lang === 'EN' && 'Display all memories'}
        </button>
      </div>
    </div>
  );
}