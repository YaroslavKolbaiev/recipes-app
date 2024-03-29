import React, { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { BounceLoader } from 'react-spinners';
import { FirebaseAuthService } from './FirebaseAuthService';
import LoginForm from './components/LoginForm';
import '@fortawesome/fontawesome-free/css/all.css';
import { HeaderBlock } from './components/HeaderBlock';
import AddEditMemory from './components/AddEditMemory';
import FirebaseFirestoreService from './FirebaseFirestoreService';
import { MemoriesList } from './components/Memorieslist';
import { Pagination } from './components/Pagination';
import { FilterAndSorting } from './components/FilterAndSorting';

export const App = () => {
  const [user, setUser] = useState(null);
  const [memories, setMemories] = useState([]);
  const [currentMemory, setCurrentMemory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [memoryPerPage, setMemoryPerPage] = useState('');
  const [lang, setLang] = useState('UA');

  FirebaseAuthService.subscribeToAuthChanges(setUser); // when firebase detects there is change in auth, it's gonna call setUser function with the user passed in

  const handleAddMemorie = useCallback(async(newMemory) => {
    try {
      await FirebaseFirestoreService.createDocument(
        'memories',
        newMemory,
      );
      alert(`Created OK with`);
      setMemories(prev => [...prev, newMemory]);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const handleUpdateMemory = useCallback(async(newMemory, memorieId) => {
    try {
      await FirebaseFirestoreService.updateDocument(
        'memories',
        memorieId,
        newMemory,
      );

      alert('uppdated OK');
      setMemories(prev => (prev.map(prevItem => (prevItem.id === memorieId
        ? newMemory
        : prevItem
      ))));
      setCurrentMemory(null);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const deleteMemory = useCallback(async(memoryId) => {
    try {
      await FirebaseFirestoreService.deleteDocument('memories', memoryId);

      alert('deleted OK');
      setMemories(prevMemory => prevMemory
        .filter(memory => memory.id !== memoryId));
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const handleMemoriesPerPage = useCallback((event) => {
    const memoriesPerPage = event.target.value;

    startTransition(() => {
      setMemories([]);
      setMemoryPerPage(memoriesPerPage);
    })
  }, []);

  const handleLoadMoreMemoriesClick = useCallback(() => {
    const lastMemory = memories[memories.length - 1];
    const cursorId = lastMemory.id;

    startTransition(() => {
      fetchMemories(cursorId);
    });
  }, [memories]);

  async function fetchMemories(cursorId = '') {
    setLoading(true);
    const queries = [];

    const orderByField = 'name';
    let orderByDirection;

    if (orderBy) {
      switch (orderBy) {
        case 'publishDateAsc':
          orderByDirection = "asc";
          break;
        case 'publishDateDesc':
          orderByDirection = "desc";
          break;
        default:
          break;
      }
    }

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: 'memories',
        queries: queries,
        perPage: memoryPerPage,
        cursorId: cursorId,
        orderByField: orderByField,
        orderByDirection: orderByDirection,

      });

      const formatedMemories = response.docs.map((memory) => {
        const { id } = memory;
        const data = memory.data();

        return { ...data, id };
      });

      if (cursorId) {
        setMemories(prev => [...prev, ...formatedMemories]);
        setLoading(false);
        return;
      }

      setMemories(formatedMemories);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchMemories();
  }, [user, memoryPerPage, orderBy]);

  return (
    <section className="hero is-fullheight hero-background">
      <div className="lang-select">
          <div className='buttons are-small'>
            <button 
              className='button p-0 is-ghost has-text-dark'
              type='button'
              onClick={() => {
                startTransition(() => {
                  setLang('EN');
                });
              }}
            >
              EN
            </button>
            <button 
              className='button p-0 is-ghost has-text-dark'
              type='button'
              onClick={() => {
                startTransition(() => {
                  setLang('UA');
                });
              }}
            >
              UA
            </button>
          </div>
        </div>
      <div className="hero-head level p-2 header">
        <div className="level-item">
          <div className="is-size-3 header-name">
            {lang === 'UA' && 'Спогади'}
            {lang === 'EN' && 'Memories'}
          </div>
        </div>
        <div className="level-item">
          {user
            ? <HeaderBlock lang={lang} user={user} />
            : <LoginForm lang={lang} />
          }
        </div>
      </div>
      <div className='container'>
        <FilterAndSorting 
          setOrderBy={setOrderBy}
          lang={lang}
        />
      </div>
      <div className="hero-body">
        {loading
          ? <div className='is-flex is-justify-content-center is-flex-grow-1'>
              <BounceLoader color='#709f9d' size={180} />
            </div>
          : (
            <div className="container">
              {memories.length
                ? (
                  <MemoriesList
                    memories={memories}
                    setCurrentMemory={setCurrentMemory}
                    deleteMemory={deleteMemory}
                  />
                )
                : <h1 className="title">No Memories Yet</h1>
              }
              <Pagination 
                memoryPerPage={memoryPerPage}
                handleMemoriesPerPage={handleMemoriesPerPage}
                handleLoadMoreMemoriesClick={handleLoadMoreMemoriesClick}
                lang={lang}
              />
              {user && (
                <AddEditMemory
                  user={user}
                  handleAddMemorie={handleAddMemorie}
                  handleUpdateMemory={handleUpdateMemory}
                  currentMemory={currentMemory}
                  setCurrentMemory={setCurrentMemory}
                  lang={lang}
                />
                )
              }
            </div>
          )
        }
      </div>
    </section>
  );
};
