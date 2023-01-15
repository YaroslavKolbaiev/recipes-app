/* eslint-disable no-alert */
import React, { useState } from 'react';
import { FirebaseAuthService } from '../FirebaseAuthService';

export default function LoginForm() {
  const [userName, setUserame] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(userName, password);
      setUserame('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleSendResetPasswordEmail() {
    if (!userName) {
      alert('Missing username!');

      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(userName);
      alert('sent the password reset email');
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await FirebaseAuthService.logInWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input is-small is-rounded"
            type="email"
            placeholder="Email"
            required
            value={userName}
            onChange={(event) => {
              setUserame(event.target.value);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input is-small is-rounded"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </p>
      </div>
      <div className="buttons m-0">
        <button
          className="button is-small is-link is-light is-rounded"
          type="submit"
        >
          Log In
        </button>
        <button
          className="button is-small is-link is-light is-rounded"
          type="button"
          onClick={handleLoginWithGoogle}
        >
          Log In With Google
        </button>
      </div>
      <button
        type="button"
        className="button is-ghost p-0"
        onClick={handleSendResetPasswordEmail}
      >
        Reset password
      </button>
    </form>
  );
}
