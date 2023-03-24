import React, { useEffect, useState, useContext, createContext } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import AppDrawer from "./Components/AppDrawer";
import { ModeContext } from "./modeProvider";

function App() {
  const [mode, setMode] = useState("view");

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
      <ModeContext.Provider value={[mode, setMode]}>
        <AppDrawer />
      </ModeContext.Provider>
    </div>
  );
}

export default App;
