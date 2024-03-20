import axios from "axios";
import { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import "../css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginInfo } from "../reducers/loginSession";
import { useNavigate } from "react-router-dom";

import DialogModal from "../common/DialogModal";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.loginSession);

  const [openLoginSuccessModal, setOpenLoginSuccessModal] = useState(false);

  useEffect(() => {
    if (isLogged.token !== "") {
      navigate("/");
    }
  }, []);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    const input = {
      username: username,
      password: password,
    };
    console.log(input);
    axios
      .post("/api/auth/authenticate", input)
      .then((res) => {
        if (res.data.token !== "") {
          dispatch(loginInfo(res.data.token, res.data.username));
          localStorage.setItem(res.data.id, res.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log({ error });
        setOpenLoginSuccessModal(true);
      });
  };

  const handleGoToJoin = () => {
    navigate("/join");
  };

  const handleModalClose = () => {
    setOpenLoginSuccessModal(false);
  };

  return (
    <div className="centered">
      <div>
        <h1>MAFIA</h1>
      </div>
      <div>
        <Input
          type="text"
          name="username"
          placeholder="아이디"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호는 8자리 이상"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={handleGoToJoin}>회원 가입</Button>
      <DialogModal
        open={openLoginSuccessModal}
        title={"error"}
        info={"아이디와 비밀번호를 입력해주세요."}
        close={handleModalClose}
      />
    </div>
  );
};

export default Login;
