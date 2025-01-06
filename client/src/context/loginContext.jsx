import { createContext, useState } from "react";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const UserContext = createContext();

export function UserProvider({ children }) {

  const [state, setState] = useState(initialState);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
}
