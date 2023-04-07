import React, { useEffect, useState, useContext, createContext } from "react";
import "./App.css";
import { Box, ThemeProvider } from "@mui/material";
import AppDrawer from "./Components/AppDrawer";
import { ThemeContext } from "@emotion/react";
import { ViewProvider } from "./Contexts/ViewContext";
import { NotesContext } from "./Contexts/NotesContext";
// import { ModeContext } from "./modeProvider";

const initialState = {
  mode: "",
  setMode: () => {},
};

export const ModeContext = createContext<{ mode: string; setMode: any }>(
  initialState
);

function App() {
  const [mode, setMode] = useState("view");
  // const [theme, setTheme] = useState({ theme: "light" });

  const [value, setValue] = useState(0);

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === "Escape") {
      console.log(key);
      setMode("view");
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", downHandler);
  }, []);

  return (
    <div className="App">
      <ViewProvider>
        <NotesContext>
          <AppDrawer />
        </NotesContext>
      </ViewProvider>
    </div>
  );
}

export default App;
