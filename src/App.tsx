import React, { useState } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import AppDrawer from "./Components/AppDrawer";

function App() {
  return (
    <div className="App">
      <Box>
        <AppDrawer />
      </Box>
    </div>
  );
}

export default App;
