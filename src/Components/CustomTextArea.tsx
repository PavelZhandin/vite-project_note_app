import React from "react";
import { TextareaAutosize } from "@mui/material";

const CustomTextArea = ({ value = "" }) => {
  return (
    <TextareaAutosize
      value={value}
      style={{
        // backgroundColor: "red",
        resize: "none",
        // height: "100vh",
        // width: "100vw",
        // border: "none",
        outline: "none",
        display: "block",
        border: "1px solid #ddd",
        marginBottom: "20px",
        width: "100%",
        height: "calc(50vh - 130px)",
        padding: "10px",
        fontSize: "inherit",
        fontFamily: "inherit",
      }}
    />
  );
};

export default CustomTextArea;
