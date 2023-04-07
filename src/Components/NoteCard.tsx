import React from "react";
import {
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { INote } from "../models/INote";
import { useNotes } from "../Contexts/NotesContext";

const NoteCard = ({ note }: { note: INote }) => {
  const { selectedNoteId, setSelectedNoteId } = useNotes();
  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 275,
      }}
    >
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={() => setSelectedNoteId(note.id)}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h4"
            sx={{ fontSize: 24 }}
            color="text.secondary"
            gutterBottom
          >
            {note.title}
          </Typography>

          <Typography>{note.body}</Typography>
          <CardActions sx={{}}>
            <Button size="small" color="error">
              Delete
            </Button>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NoteCard;
