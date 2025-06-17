// src/context/UserContext.js
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    // Tenta recuperar o nome do localStorage na inicialização
    return localStorage.getItem("User Name") || "";
  });

   useEffect(() => {
    // Sempre que o nome mudar, salva no localStorage
    if (userName) {
      localStorage.setItem("User Name", userName);
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
