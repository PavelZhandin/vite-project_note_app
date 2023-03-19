import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box } from "@mui/material";
import AppDrawer from "./Components/AppDrawer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Box>
        <AppDrawer />
      </Box>
    </div>
  );
}

export default App;
