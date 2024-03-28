import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../reducers/loginSession";
import {
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";

import "../css/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.loginSession);

  console.log(isLogged);
  const [roomCount, setRoomCount] = useState([]);
  const [open, setOpen] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomstatus, setRoomStatus] = useState("");

  useEffect(() => {});

  const handleClickMakeRoomOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "roomname") {
      setRoomName(value);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(isLogged.id);
    dispatch(logout());
  };

  const handleMakeRoom = () => {
    const id = isLogged.id;

    const room = {
      name: roomName,
      owner: id,
      status: "wait",
    };
    axios
      .post("/api/chat", room, {
        headers: { Authorization: "Bearer " + isLogged.token },
      })
      .then((res) => {
        handleClose();
      });
  };

  const handlecheckRoom = () => {
    axios
      .get("/api/chat", {
        headers: { Authorization: "Bearer " + isLogged.token },
      })
      .then((res) => {
        setRoomCount(res.data);
      });
  };

  return (
    <>
      <div>
        home
        <Button onClick={handleLogout}>로그아웃</Button>
        <Button onClick={handleClickMakeRoomOpen}>방만들기</Button>
        <Button onClick={handlecheckRoom}>방확인</Button>
      </div>
      <div>
        {roomCount.map((room, index) => {
          return (
            <div>
              <Paper
                key={room.roomid}
                sx={{
                  width: 200,
                  height: 100,
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  margin: "10px",
                }}
              >
                <p className="gameroom">{room.name}</p>
              </Paper>
            </div>
          );
        })}
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth={true}>
        <DialogTitle>방 만들기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            onChange={handleInputChange}
            name="roomname"
            label="이름"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMakeRoom}>생성</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
