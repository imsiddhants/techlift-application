import { useEffect, useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import AuthContext from "../authContext/authContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Admins = ({ setusers }) => {
  const context = useContext(AuthContext);
  useEffect(() => {
    if (context.isLoggedIn) {
      axios
        .get("http://localhost:8080/v1/getAdmins/allMemberOfAdmins", {
          withCredentials: true,
        })
        .then((response) => {
          setusers(response.data.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the user list!",
            error
          );
        });
    }
  }, [context.isLoggedIn, setusers]);

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography component="p" variant="h3">
          Welcome Admin
        </Typography>
      </Box>
    </Container>
  );
};

export default Admins;
