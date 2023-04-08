import React from "react";
import { Box, Input, TextField } from "@mui/material";
import CustomTextArea from "./CustomTextArea";
import { useNotes } from "../Contexts/NotesContext";
import { INote } from "../models/INote";

const drawerWidth = 340;

const emptyNote: INote = {
  id: "",
  title: "",
  body: "",
  lastModified: 0,
};

const NoteEditArea = () => {
  const { selectedNoteId, notes, setNotes } = useNotes();

  const getSelectedNote = (selectedId: string): INote => {
    return notes.find(({ id }) => id === selectedId) || emptyNote;
  };

  const onUpdateNote = (updatedNote: INote) => {
    const updatedNotesArr = notes.map((note: INote) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const onEditField = (field: "body" | "title", value: string) => {
    onUpdateNote({
      ...getSelectedNote(selectedNoteId as string),
      [field]: value,
      lastModified: Date.now(),
    });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: "64px",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Box>
        <Input
          value={getSelectedNote(selectedNoteId as string)?.title}
          onChange={(e) => onEditField("title", e.target.value)}
          sx={{
            fontSize: "60px",
            "&::before": {
              borderBottom: "none",
            },
            "&::after": {
              borderBottom: "none",
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          inputProps={{
            inputComponent: CustomTextArea,
          }}
          value={getSelectedNote(selectedNoteId as string)?.body}
          onChange={(e) => onEditField("body", e.target.value)}
          sx={{
            "& fieldset": {
              borderColor: "transparent !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default NoteEditArea;
