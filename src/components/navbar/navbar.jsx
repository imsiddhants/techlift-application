import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AccountCircle } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  List,
  ListItemText,
  ListItem,
  Paper,
} from "@mui/material";
import AuthContext from "../authContext/authContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Dropdown = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1,
  marginTop: theme.spacing(1),
  maxHeight: 500,
  overflowY: "auto",
  maxWidth: "300px",
}));

// eslint-disable-next-line react/prop-types
const Navbar = ({ handleLogout }) => {
  let context = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredusers, setFilteredusers] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setFilteredusers([]);
    } else {
      const filtered = context.users.filter((user) =>
        user.first_name.toLowerCase().includes(value)
      );
      setFilteredusers(filtered);
    }
  };

  const handleClick = (user) => {
    console.log(user);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Techlift
        </Typography>
        {!context.isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/registration">
              Register
            </Button>
          </>
        ) : (
          <>
            {context.currentUser.role === "admin" && (
              <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                </Search>
                {searchTerm && (
                  <Dropdown>
                    <List>
                      {filteredusers.map((user) => (
                        <ListItem
                          key={user.id}
                          onClick={() => handleClick(user)}
                        >
                          <ListItemText primary={user.first_name} />
                        </ListItem>
                      ))}
                    </List>
                  </Dropdown>
                )}

                <Button
                  color="inherit"
                  component={Link}
                  to="admin/users"
                >
                  All users
                </Button>
                <Button color="inherit" component={Link} to="/projectUpload">
                  Create Project
                </Button>
                <Button color="inherit" component={Link} to="/projectlists">
                  View Project
                </Button>
              </>
            )}
            {context.currentUser.role === "user" && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/user/contribution"
                >
                  AddContribution
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/viewcontributions"
                >
                  ViewContribution
                </Button>
              </>
            )}
            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  {context.currentUser.name}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
