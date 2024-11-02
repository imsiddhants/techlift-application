import { Navigate, Outlet } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
