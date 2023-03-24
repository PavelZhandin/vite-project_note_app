import { useState, MouseEvent, MouseEventHandler } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

type ModalProps = {
  onClick: () => void;
};

const DeleteModal = ({ onClick }: ModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen} color="error">
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deleting note
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap="15px">
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="info"
            >
              Cancel
            </Button>
            <Button onClick={onClick} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteModal;
