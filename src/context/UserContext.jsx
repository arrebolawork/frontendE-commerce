import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
  cart: new Map(),
});
