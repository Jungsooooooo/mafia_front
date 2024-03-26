import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../reducers/loginSession";
import { Box, Paper } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";

import "../css/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.loginSession);

  const [roomCount, setRoomCount] = useState([]);

  useEffect(() => {});

  const handleLogout = () => {
    localStorage.removeItem(isLogged.id);
    dispatch(logout());
  };

  const handleMakeRoom = () => {
    const room = {
      name: "test1",
    };
    axios
      .post("/api/chat", room, {
        headers: { Authorization: "Bearer " + isLogged.token },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handlecheckRoom = () => {
    const room = {
      name: "test2",
    };
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
        <Button onClick={handleMakeRoom}>방만들기</Button>
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
    </>
  );
};

export default Home;
