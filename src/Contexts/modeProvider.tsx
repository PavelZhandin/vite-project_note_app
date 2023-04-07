import {
  createContext,
  FC,
  ReactComponentElement,
  ReactElement,
  useState,
} from "react";

export const ModeContext = createContext<any>([]);

const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [mode, setMode] = useState("view");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
