import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });

  const login = (token, userDetails) => {
    localStorage.setItem('token', token);
    setAuthState({ isAuthenticated: true, user: userDetails, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);