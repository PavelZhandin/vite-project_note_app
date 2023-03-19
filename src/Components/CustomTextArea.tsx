import React from "react";
import { TextareaAutosize } from "@mui/material";

const CustomTextArea = () => {
  return (
    <TextareaAutosize
      style={{
        // backgroundColor: "red",
        resize: "none",
        height: "100vh",
        width: "100vw",
        border: "none",
        outline: "none",
      }}
    />
  );
};

export default CustomTextArea;
