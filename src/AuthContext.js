// AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loginResponse, setLoginResponse] = useState(null);

  const setLoginData = (response) => {
    setLoginResponse(response);
  };

  return (
    <AuthContext.Provider value={{ loginResponse, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
