import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext();
const AppWrapper = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  const [vauth, setVauth] = useState(false);
  const [ulo, setUlo] = useState(false);
  const [Vitems, setVitems] = useState();
  const [isVendor, setIsVendor] = useState(false);
  return (
    <Context.Provider
      value={{
        isVendor,setIsVendor,
        auth,
        setAuth,
        user,
        setUser,
        ulo,
        setUlo,
        vauth,
        setVauth,
        Vitems,
        setVitems,
      }}
    >
      <App />
    </Context.Provider>
  );
}
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
