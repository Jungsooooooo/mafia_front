import axios from "axios";
import { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import "../css/Login.css";
import { useDispatch } from "react-redux";
import { loginInfo } from "../reducers/loginSession";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

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
    axios.post("/api/auth/authenticate", input).then((res) => {
      dispatch(loginInfo(res.data.token));
    });
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
    </div>
  );
};

export default Login;
