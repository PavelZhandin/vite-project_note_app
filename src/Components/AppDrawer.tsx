import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
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
import { useState } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import CustomTextArea from "./CustomTextArea";

const drawerWidth = 240;

const notesArray: INote[] = [
  {
    id: 1,
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum libero, pariatur deleniti vitae ut, fugit deserunt rerum odio architecto voluptas sit consequatur? Ad voluptatibus obcaecati consectetur similique. Dolor, magnam ipsum!",
  },
  {
    id: 2,
    body: "If you wish to reuse any or all of this article please use the link below which will take you to the Copyright Clearance Center’s RightsLink service. You will be able to get a quick price and instant permission to reuse the content in many different ways.",
  },
  {
    id: 3,
    body: "(Editing by Ed Osmond)The author is a Reuters contributor. The opinions expressed are her own)By Chris TaylorNEW YORK, April 1 Over a year ago, Susan Conner, then pregnant, made a life-altering",
  },
];

interface Props {
  window?: () => Window;
}

export default function AppDrawer(props: Props) {
  const [notes, setNotes] = useState<INote[]>(notesArray);
  const [selectedNote, setSelectedNote] = useState<INote>();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {notes.map((note) => (
          <ListItem key={note.id} disablePadding>
            <ListItemButton onClick={() => setSelectedNote(note)}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {/* {note.body.slice(5)} */}
              </ListItemIcon>
              <ListItemText primary={note.body.slice(0, 15).concat("...")} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

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
        {/* <Typography>{selectedNote?.body}</Typography> */}
        <TextField
          sx={{
            height: "100vh",
          }}
          fullWidth
          multiline
          InputProps={{
            inputComponent: CustomTextArea,
          }}
          // value={text}
          // onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
