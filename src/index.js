import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='207164305759-3tglb40552fjs21m184fre058tghdd9t.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
);


