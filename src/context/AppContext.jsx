import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <AppContext.Provider value={{ fabOpen, setFabOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
