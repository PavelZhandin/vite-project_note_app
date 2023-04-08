import { useEffect } from "react";
import {
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import { INote } from "../models/INote";
import { useNotes } from "../Contexts/NotesContext";
import DeleteModal from "./DeleteModal";

const NoteCard = ({ note }: { note: INote }) => {
  const { notes, setNotes, selectedNoteId, setSelectedNoteId } = useNotes();

  const handleDelete = (e: any) => {
    setNotes(notes.filter(({ id }) => id !== note.id));
    setSelectedNoteId("");
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 275,
          height: 275,
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: " space-between",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedNoteId(note.id);
          }}
        >
          <CardContent>
            <Typography
              whiteSpace="normal"
              component="h4"
              sx={{ fontSize: 24 }}
              color="text.secondary"
              gutterBottom
            >
              {note.title}
            </Typography>

            <Typography>{note.body.slice(0, 160)}</Typography>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <DeleteModal
              onClick={() => {
                handleDelete(note.id);
              }}
            />
          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NoteCard;
