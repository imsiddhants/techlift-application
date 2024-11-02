import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";
import AuthContext from "../authContext/authContext";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const Alluser = ({ setUserData, setuserName }) => {
  const context = useContext(AuthContext);
  const handleuserClick = (userName) => {
    setuserName(null);
    axios
      .post(
        `http://localhost:3000/v1/getAdmins/allContributionByuser`,
        {
          name: userName,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserData(response.data.contributiions);
        setuserName(userName);
      })
      .catch((error) => {
        console.log(error.message);
        setUserData(null);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200 },
    { field: "firstName", headerName: "First Name", minWidth: 200 },
    { field: "lastName", headerName: "Last Name", minWidth: 200 },
    { field: "userId", headerName: "user ID", minWidth: 200 },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 150,
      renderCell: (param) => (
        <Button
          onClick={() => {
            handleuserClick(param.row.firstName);
          }}
          component={Link}
          to="/admins/users/table"
          variant="outlined"
        >
          View
        </Button>
      ),
    },
  ];

  const rows = context.users.map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    userId: user.user_id,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          marginBottom: "50px",
          fontWeight: "bold",
          marginTop: "50px",
          letterSpacing: "0.1em",
          fontSize: "24px",
        }}
      >
        user List
      </Typography>
      <Box sx={{ maxWidth: "1000px" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
            },
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[100],
            },
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
      </Box>
    </Box>
  );
};

export default Alluser;
