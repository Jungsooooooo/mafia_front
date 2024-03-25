import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Input from "@mui/material/Input";

import "../css/Join.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DialogModal from "../common/DialogModal";

const Join = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openLoginSuccessModal, setOpenLoginSuccessModal] = useState(false);
  const [joinInfo, setJoinInfo] = useState("");

  const isLogged = useSelector((state) => state.loginSession);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged.token !== "") {
      navigate("/");
    }
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleJoin = () => {
    const input = {
      username: username,
      password: password,
    };

    if (input.username === "" || input.password === "") {
      setOpenLoginSuccessModal(true);
      return setJoinInfo("아이디와 비밀번호를 입력해주세요");
    }

    axios
      .post("/api/users/join", input)
      .then((res) => {
        setJoinInfo("회원가입이 완료되었습니다.");
        setOpenLoginSuccessModal(true);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          // 400 오류에 대한 처리
          const errorMessage = error.response.data.message;
          setJoinInfo(errorMessage);
        }
        setOpenLoginSuccessModal(true);
      });
  };

  const handleModalClose = () => {
    setOpenLoginSuccessModal(false);
  };

  return (
    <>
      <div className="centered">
        <h1> MAFIA</h1>
        <Box className="outline" maxWidth="lg">
          <div className="joinId">
            <Input
              type="text"
              placeholder="아이디"
              name="username"
              value={username}
              onChange={handleInputChange}
              fullWidth={true}
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder="대소문자 및 숫자 포함 8자리 이상"
              value={password}
              onChange={handleInputChange}
              fullWidth={true}
            />
          </div>
        </Box>

        <div className="joinButton">
          <Button variant="contained" onClick={handleJoin}>
            가입
          </Button>
        </div>
      </div>
      <DialogModal
        open={openLoginSuccessModal}
        title={"가입"}
        info={joinInfo}
        close={handleModalClose}
      />
    </>
  );
};

export default Join;
