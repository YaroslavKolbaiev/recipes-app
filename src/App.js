import './App.css';
import 'bulma/css/bulma.css';

import firebase from './FirebaseConfig';

export const App = () => {
  return (
    <section className='hero is-fullheight hero-background'>
      <div className='hero-body'>
        <h1 className='title'>Firebase App</h1>
      </div>
    </section>
  )
}