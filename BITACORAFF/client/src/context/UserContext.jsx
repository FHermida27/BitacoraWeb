import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers debería usarse con un UserProvider');
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    // tu lógica para obtener usuarios
  };

  return (
    <UserContext.Provider value={{ users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
}