import { Link, useNavigate } from "react-router-dom";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
export default function SignIn({ handleLogin, setCurrentUser, currentUser }) {
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    axios
      .post("http://localhost:8080/users/login", payload, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('data data',response.data)
          if (response.data?.isAdmin === false) {
            setCurrentUser({
              isLoggedIn: true,
              username: response.data.username,
              role: 'user',
            });
            navigate("/user");
          } else if (response.data?.isAdmin === true) {
            setCurrentUser({
              isLoggedIn: true,
              username: response.data.username,
              role: 'admin',
            });
            navigate("/admins");
          } else {
            console.log('RES', response);
            setCurrentUser({
              isLoggedIn: true,
              username: response.data.username,
              role: 'user',
            });
          }
          handleLogin();
        } else {
          alert("login failed");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Only render the login form if there's no current user
  if (currentUser) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
