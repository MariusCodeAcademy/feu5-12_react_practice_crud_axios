import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  email: null,
  token: null,
  login(userToken, userEmail) {},
  logout() {},
  isLoggedIn: false,
});

const localEmailKey = 'LOCAL_EMAIL';
const localTokenKey = 'LOCAL_TOKEN';

function AuthProvider({ children }) {
  // pasiimti is storage jei yra
  const tokenFromStorage = localStorage.getItem(localTokenKey);
  const emailFromStorage = localStorage.getItem(localEmailKey);
  // console.log('tokenFromStorage ===', tokenFromStorage);
  const [token, setToken] = useState(tokenFromStorage || '');
  const [email, setEmail] = useState(emailFromStorage || '');

  // const isLoggedIn = token === '' ? false : true;
  // const isLoggedIn = token ? true : false;
  const isLoggedIn = !!token;

  function login(userToken, userEmail) {
    setToken(userToken);
    setEmail(userEmail);
    // irasyti i storage
    localStorage.setItem(localTokenKey, userToken);
    localStorage.setItem(localEmailKey, userEmail);
  }
  function logout() {
    // sukurti funkcija logout
    // nustato token ir email i ''
    setToken('');
    setEmail('');
    // istrinti is storage
    localStorage.removeItem(localTokenKey);
    localStorage.removeItem(localEmailKey);
  }
  // perduodam logout i authCtx
  // panaudojam logout Hederyje paspaudus logout mygtuka

  const authCtx = {
    token,
    email,
    login,
    logout,
    isLoggedIn,
  };
  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};
export default AuthProvider;

// custon useAuthCtx hook 2 lvl burtas
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  return ctx;
}
