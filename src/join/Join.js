import { useState } from "react";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";

import "../css/Join.css";
import { Button } from "@mui/material";

const Join = () => {
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
              type="text"
              name="password"
              placeholder="대소문자 및 숫자 포함 8자리 이상"
              value={password}
              onChange={"handleInputChange"}
              fullWidth={true}
            />
          </div>
        </Box>

        <div className="joinButton">
          <Button variant="contained">가입 요청</Button>
        </div>
      </div>
    </>
  );
};

export default Join;
