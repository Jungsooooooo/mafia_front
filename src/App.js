import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import Join from "./join/Join";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  const checkLogin = useSelector((state) => state.loginSession);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/"
            element={
              <PrivateRoute
                authenticated={checkLogin.token}
                component={<Home />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
