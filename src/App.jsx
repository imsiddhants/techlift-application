import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For handling cookies
import axios from "axios";
import Navbar from "./components/navbar/navbar";
import Login from "./components/Authentication/login";
import Registration from "./components/Authentication/signup";
import Admins from "./components/admins/admins";
import ProjectUploadForm from "./components/admins/projectUpload";
import UserDash from "./components/users/usersDashboard";
import CreateContribution from "./components/users/createContribution";
import AuthContext from "./components/authContext/authContext";
import PrivateRoute from "./components/privateRoutes/privateRoutes";
import AllContributions from "./components/users/allContributionOfUser";
import ProjectList from "./components/admins/projectList";
import AllUsers from "./components/admins/allUsers";
import UserTable from "./components/admins/usersTable";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    role: "user",
  });
  const [userName, setUserName] = useState();

  // Function to verify JWT token and fetch user data
  const verifyToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/verify-token", {
        withCredentials: true,
      });
      if (response.status === 200 && response.data) {
        setCurrentUser({
          name: response.data.name,
          role: response.data.role,
        });
        setIsLoggedIn(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout(); // Log out user if token verification fails
    }
  };
  

  useEffect(() => {
    verifyToken();
  }, []);
  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUsers([]);
    setCurrentUser({
      name: "",
      role: "user",
    });
    setUserName(null);
    Cookies.remove("jwt"); // Clear JWT token on logout
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
      }}
    >
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/registration" element={<Registration />} />

        {/* Conditional rendering to redirect based on login status */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              currentUser.role === "admin" ? (
                <Navigate to="/admins" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Login handleLogin={handleLogin} setCurrentUser={setCurrentUser} />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/projectUpload" element={<ProjectUploadForm />} />
          <Route path="/user" element={<UserDash />} />
          <Route
            path="/admins"
            element={<Admins userData={userData} setUsers={setUsers} />}
          />
          <Route path="/user/contribution" element={<CreateContribution />} />
          <Route path="/viewcontributions" element={<AllContributions />} />
          <Route path="/projectlists" element={<ProjectList />} />
          <Route
            path="/admins/users"
            element={<AllUsers setUserData={setUserData} setUserName={setUserName} />}
          />
          <Route
            path="/admins/users/table"
            element={
              <UserTable
                userData={userData}
                userName={userName}
                setUserData={setUserData}
              />
            }
          />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
