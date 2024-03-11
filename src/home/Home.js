import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logout } from "../reducers/loginSession";

const Home = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.loginSession);

  const handleLogout = () => {
    localStorage.removeItem(isLogged.id);
    dispatch(logout());
  };

  return (
    <div>
      home
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
};

export default Home;
