import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import { useState, useEffect } from "react";

const DialogModal = (props) => {
  const [open, setOpen] = useState(false);
  console.log(props);

  useEffect(() => {
    if (props.open === true) {
      handleModal();
    } else {
      handleClose();
    }
  }, [props.open]);

  const handleModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogModal;
