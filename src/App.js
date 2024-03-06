import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const checkLogin = useSelector((state) => state.loginSession);
  console.log(checkLogin.token);
  console.log(checkLogin.token === "");

  const CheckToken = (props) => {
    if (checkLogin.isLogged) {
      return <Route {...props} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <CheckToken path="/findroom" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
