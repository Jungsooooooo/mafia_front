import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.loginSession);
  return isAuthenticated.token === "" ? (
    <Navigate to="/login" />
  ) : (
    props.component
  );
};

export default PrivateRoute;
