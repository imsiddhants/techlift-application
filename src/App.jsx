import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
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
    setUserName();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        users: users,
        currentUser: currentUser,
      }}
    >
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={
            <Login handleLogin={handleLogin} setCurrentUser={setCurrentUser} />
          }
        />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/projectUpload" element={<ProjectUploadForm />} />
          <Route path="/user" element={<UserDash />} />
          <Route
            path="/admins"
            element={
              <Admins
                userData={userData}
                setUsers={setUsers}
              />
            }
          />
          <Route
            path="/user/contribution"
            element={<CreateContribution />}
          />
          <Route path="/viewcontributions" element={<AllContributions />} />
          <Route path="/projectlists" element={<ProjectList />} />
          <Route
            path="/admins/users"
            element={
              <AllUsers
                setUserData={setUserData}
                setUserName={setUserName}
              />
            }
          />
          <Route
            path="/admins/users/table"
            element={
              <userTable
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
