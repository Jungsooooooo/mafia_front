import axios from "axios";
import { useState } from "react";

const Login = () => {
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
    axios.post();
  };

  return (
    <>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>로그인</button>
    </>
  );
};

export default Login;
