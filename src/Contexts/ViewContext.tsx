import { useState, createContext, useContext, ReactNode } from "react";

type ContextType = {
  view: string;
  toggleView: (val: "row" | "grid") => void;
};

const ViewContext = createContext<ContextType>({
  view: "",
  toggleView: () => {},
});

export const useView = () => {
  return useContext(ViewContext);
};

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<string>("grid");

  const toggleView = (newView: "row" | "grid") => {
    setView(newView);
  };

  return (
    <ViewContext.Provider
      value={{
        view,
        toggleView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};
