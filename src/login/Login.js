import axios from "axios";
import { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import "../css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginInfo } from "../reducers/loginSession";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.loginSession);
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
    axios.post("/api/auth/authenticate", input).then((res) => {
      if (res.data.token !== "") {
        dispatch(loginInfo(res.data.token, res.data.username));
        localStorage.setItem(res.data.id, res.data.token);
        navigate("/");
      }
    });
  };

  const handleGoToJoin = () => {
    navigate("/join");
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
    </div>
  );
};

export default Login;
