import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // const [admins, setAdmins] = useState([]);
  // const [selectedAdmin, setSelectedAdmin] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/v1/user/getAdmins")
  //     .then((response) => {
  //       if (response.status == 200) {
  //         setAdmins(response.data.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setAdmins([]);
  //     });
  // }, []);

  // const handleChange = (event) => {
  //   setSelectedAdmin(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      userId: data.get("userID"),
    };
    console.log(payload);
    axios
      .post("http://localhost:3000/v1/user/signup", payload)
      .then((response) => {
        if (response.status == 200) navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel id="adminName-label">Admin Name</InputLabel>
                  <Select
                    labelId="adminName-label"
                    id="adminName"
                    name="adminName"
                    value={selectedAdmin}
                    onChange={handleChange}
                  >
                    {admins.map((admin) => (
                      <MenuItem key={admin.id} value={admin.admin_name}>
                        {admin.admin_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userID"
                  label="user ID"
                  id="userId"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
