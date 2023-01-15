/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { startTransition, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FirebaseStorageService from '../FirebaseStorageService';

export default function AddEditMemory({
  handleAddMemorie,
  user,
  handleUpdateMemory,
  currentMemory,
  setCurrentMemory,
}) {
  const [name, setName] = useState(''); 
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(-1);
  const fileInputRef = useRef();

  const handleCancelButton = () => {
    startTransition(() => {
      setCurrentMemory(null);
    });
  };

  const resetForm = () => {
    setName('');
    setDate('');
    setText('');
    setImageUrl('');
    setUploadProgress(-1);
  };

  function handleOnSubmit(event) {
    event.preventDefault();

    if (!name || !date || !text || !imageUrl) {
      alert('Please input fields');

      return;
    }

    const newMemory = {
      name,
      date,
      text,
      author: user.email,
      imageUrl,
    };

    if (currentMemory) {
      handleUpdateMemory(newMemory, currentMemory.id);
      resetForm();

      return;
    }

    handleAddMemorie(newMemory);
    resetForm();
  }

  async function handleFileChanged(event) {
    const files = event.target.files;
    const file = files[0];

    if (!file) {
      alert('File Select failed. Please try again.');
      return;
    };

    const generatedFileId = uuidv4();

    try {
      const downloadUrl = await FirebaseStorageService.uploadFile(
        file,
        `memories/${generatedFileId}`,
        setUploadProgress
      );

      setImageUrl(downloadUrl);
      // handleUploadFinish(downloadUrl);
    } catch (error) {
      setUploadProgress(-1);
      fileInputRef.current.value = null;
      alert(error.message);
      throw error;
    }
  };

  function handleCancelImageClick() {
    FirebaseStorageService.deleteFile(imageUrl);
    fileInputRef.current.value = null;
    setImageUrl('');
    setUploadProgress(-1);
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form
          className="box has-background-info-light"
          onSubmit={handleOnSubmit}
        >
          <h1 className="is-size-5 has-text-centered has-text-weight-semibold">
            {currentMemory ? 'Update Memory' : 'Add a New Memory'}
          </h1>
          <div className="field has-addons">
            <div className="control">
              <button type="button" className="button is-static">
                <p className="is-size-7">Memory Name</p>
              </button>
            </div>
            <div className="control is-expanded">
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="input has-background-warning-light"
              />
            </div>
          </div>
          <div className="field has-addons">
            <div className="control">
              <button type="button" className="button is-static">
                <p className="is-size-7">Date</p>
              </button>
            </div>
            <div className="control is-expanded">
              <input
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
                className="input has-background-warning-light"
              />
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            className="textarea has-background-warning-light mb-2"
            placeholder="Tell your story"
          />

          <div className='file is-dark mb-2'>
            <label className='file-label'>
              <input 
                className='file-input' 
                type="file" 
                name='resume'
                accept='image/*'
                onChange={handleFileChanged}
                ref={fileInputRef}
              />
              <span className='file-cta'>
                <span className='file-icon'>
                  <i className="fa-solid fa-upload"></i>
                </span>
                <span className='file-label'>Upload File</span>
              </span>
            </label>
          </div>

          {uploadProgress > -1 && (
            <progress className="progress" value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
          )}

          {imageUrl && (
            <div className='notification is-warning is-light'>
              <button 
                className='delete'
                type='button'
                onClick={handleCancelImageClick}
              />
              <figure className="image">
                <img src={imageUrl} alt='img' />
              </figure>
            </div>
          )}

          <div className="buttons">
            <button
              type="submit"
              className="button is-dark"
            >
              {currentMemory ? 'Update Memory' : 'Create Memory'}
            </button>
            {
              currentMemory
              && (
              <button
                onClick={handleCancelButton}
                type="button"
                className="button is-danger"
              >
                Cancel
              </button>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
}
