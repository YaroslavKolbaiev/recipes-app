import React, { startTransition } from 'react';

export const MemoriesList = ({ memories, setCurrentMemory, deleteMemory }) => {
  const onEditMemoryClick = (memoryId) => {
    const selectedMemory = memories.find(memory => memory.id === memoryId);

    if (selectedMemory) {
      startTransition(() => {
        setCurrentMemory(selectedMemory);
      });
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div className="columns is-multiline">
      {memories.map(memorie => (
        <div key={memorie.id} className="column is-one-third">
          <div className="card card-body">
            <div className="card-image">
              <figure className="image">
              <button
                  className="delete"
                  style={{ position: 'absolute' }}
                  type="button"
                  onClick={() => {
                    deleteMemory(memorie.id);
                  }}
                />
                <img
                  src={memorie.imageUrl}
                  alt="Img"
                />
                
              </figure>
            </div>
            <div className="card-content">
              <button
                type="button"
                className="update-button"
                onClick={() => {
                  onEditMemoryClick(memorie.id);
                }}
              >
                <span className="icon">
                  <i className="fa-solid fa-pen-to-square" />
                </span>
              </button>
              <div className="media">
                <div className="media-content">
                  <p className="title is-3">{memorie.name}</p>
                  <p className="subtitle is-6 mb-0">
                    @
                    {memorie.author.split('@')[0]}
                  </p>
                  <hr className="mb-1 mt-2 has-background-grey-light" />
                  <p 
                    className='mb-2 text'
                  >
                    {memorie.text}
                  </p>
                  <time className='time'>
                    Date:
                    {' '}
                    {memorie.date.toString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
