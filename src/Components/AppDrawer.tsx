import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { INote } from "../models/INote";
import { useState, useCallback } from "react";
import { Button, Input, TextField } from "@mui/material";
import CustomTextArea from "./CustomTextArea";
import { Imode } from "../models/Imode";
import uuid from "react-uuid";
import { ModeContext } from "../modeProvider";
import DeleteModal from "./DeleteModal";
const drawerWidth = 340;
const emptyNote = {
  id: "",
  title: "",
  body: "",
  lastModified: 0,
};
interface Props {
  window?: () => Window;
}

export default function AppDrawer(props: Props) {
  const [view, setView] = useContext(ModeContext);
  console.log(view);

  const [notes, setNotes] = useState<INote[]>(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [selectedId, setSelectedId] = useState<string>();
  const [mode, setMode] = useState<Imode>(Imode.view);
  const { window } = props;
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
      title: "Untitled Note",
      body: "New Note",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    // setActiveNote(newNote.id);
    setSelectedId(newNoteId);
  };

  const onUpdateNote = (updatedNote: INote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const onEditField = (field: "body" | "title", value: string) => {
    onUpdateNote({
      ...getSelectedNote(selectedId as string),
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

  const drawer = (
    <Box>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Notes</h3>
        <Button variant="outlined" onClick={onAddNote}>
          Add
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {notes.map((note) => (
          <ListItem key={note.id} disablePadding>
            <ListItemButton
              selected={note.id === selectedId}
              onClick={() => {
                setSelectedId(note.id);
                setMode(Imode.view);
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

  const setEditMode = useCallback(() => {
    // setMode(Imode.edit);
    setView(Imode.edit);
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
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
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {/* {view === Imode.view && (
          <Box
            onDoubleClick={() => {
              setEditMode();
              console.log("double");
            }}
          >
            <Typography variant="h2">
              {getSelectedNote(selectedId as string)?.title}
            </Typography>
            <Typography>
              {getSelectedNote(selectedId as string)?.body}
            </Typography>
          </Box>
        )} */}

        {/* {view === Imode.edit && ( */}
        <Box>
          <Input
            value={getSelectedNote(selectedId as string)?.title}
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
            value={getSelectedNote(selectedId as string)?.body}
            onChange={(e) => onEditField("body", e.target.value)}
            sx={{
              "& fieldset": {
                borderColor: "transparent !important",
              },
            }}
          />
        </Box>
        {/* )} */}
      </Box>
    </Box>
  );
}
