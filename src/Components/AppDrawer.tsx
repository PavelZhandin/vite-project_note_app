import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { INote } from "../models/INote";
import { useState, useCallback } from "react";
import { Button, Input, TextField } from "@mui/material";
import { Imode } from "../models/Imode";
import uuid from "react-uuid";
import { ModeContext } from "../App";
import DeleteModal from "./DeleteModal";
import SearchInput from "./SearchInput";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useView } from "../Contexts/ViewContext";
import NoteCard from "./NoteCard";
import { useNotes } from "../Contexts/NotesContext";
import NoteEditArea from "./NoteEditArea";

const drawerWidth = 340;

interface Props {
  window?: () => Window;
}

const emptyNote: INote = {
  id: "",
  title: "",
  body: "",
  lastModified: 0,
};

export default function AppDrawer({ window }: Props) {
  // const [mode, setMode] = useState<Imode>(Imode.view);
  const [searchValue, setSearchValue] = useState("");

  const { mode } = useContext(ModeContext);

  const { view, toggleView } = useView();
  const { notes, setNotes, selectedNoteId, setSelectedNoteId } = useNotes();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onAddNote = () => {
    const newNoteId = uuid();
    const newNote = {
      id: newNoteId,
      title: `Untitled Note # ${notes.length + 1}`,
      body: "New Note",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);

    setSelectedNoteId(newNoteId);
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

  const onDeleteNote = (noteId: string) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const getSelectedNote = (selectedId: string): INote => {
    return notes.find(({ id }) => id === selectedId) || emptyNote;
  };

  const handleFilteredNotes = (filterString: string) => {
    setSearchValue(filterString.toLowerCase());
  };

  const drawer = (
    <Box>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Notes</h3>
        <Button variant="outlined" onClick={onAddNote}>
          Add
        </Button>
      </Toolbar>
      <SearchInput filterFunc={handleFilteredNotes} />
      {/* <Divider /> */}
      <List>
        {notes
          .filter((note: INote) =>
            note.title.toLowerCase().includes(searchValue)
          )
          .map((note) => (
            <ListItem key={note.id} disablePadding>
              <ListItemButton
                selected={note.id === selectedNoteId}
                onClick={() => {
                  setSelectedNoteId(note.id);
                }}
              >
                <ListItemText primary={note.title.slice(0, 20).concat("...")} />

                <DeleteModal onClick={() => onDeleteNote(note.id)} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* <TOPBAR> */}
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: view === "row" ? `calc(100% - ${drawerWidth}px)` : "100%",
          },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
            <IconButton
              disabled={view === "grid"}
              onClick={() => {
                toggleView("grid");
                setSelectedNoteId("");
              }}
            >
              <GridViewIcon />
            </IconButton>
          </Typography>
          <IconButton
            disabled={view === "row"}
            onClick={() => {
              toggleView("row");
              setSelectedNoteId("");
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* </TOPBAR> */}

      {view === "row" && (
        <Box display="flex">
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          {selectedNoteId && <NoteEditArea />}
        </Box>
      )}

      {view === "grid" && (
        <Box display="flex" flexDirection={"column"}>
          {!selectedNoteId && (
            <Box
              p={3}
              mt="64px"
              display="flex"
              gap="25px"
              flexWrap="wrap"
              width="100vw"
            >
              {notes.map((note: INote) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </Box>
          )}
          {selectedNoteId && <NoteEditArea />}
        </Box>
      )}
    </Box>
  );
}
