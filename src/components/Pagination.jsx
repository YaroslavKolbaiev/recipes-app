export const Pagination = ({ 
  memoryPerPage,
  handleMemoriesPerPage,
  handleLoadMoreMemoriesClick 
}) => {
  return (
    <div>
      <label className="label">Memories Per Page</label>
      <div className="select">
        <select
          value={memoryPerPage}
          onChange={handleMemoriesPerPage}
        >
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
      </div>
      <div className="buttons">
        <button 
          className="button" 
          type="button"
          onClick={handleLoadMoreMemoriesClick}
        >
          Load More Memories
        </button>
      </div>
    </div>
  );
}