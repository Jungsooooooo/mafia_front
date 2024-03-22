import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../reducers/loginSession";

import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.loginSession);

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
        console.log(res);
      });
  };

  return (
    <div>
      home
      <Button onClick={handleLogout}>로그아웃</Button>
      <Button onClick={handleMakeRoom}>방만들기</Button>
      <Button onClick={handlecheckRoom}>방확인</Button>
    </div>
  );
};

export default Home;
