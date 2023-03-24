import {
  createContext,
  FC,
  ReactComponentElement,
  ReactElement,
  useState,
} from "react";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const ModeContext = createContext<any>([]);

const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [mode, setMode] = useState("view");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
      //{" "}
    </ModeContext.Provider>
  );
};
