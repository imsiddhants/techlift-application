import { useState, useEffect, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import AuthContext from "../authContext/authContext";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import SaveIcon from "@mui/icons-material/Save";
import { grey } from "@mui/material/colors";
const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const context = useContext(AuthContext);

  const fetchAllproject = () => {
    axios
      .get("http://localhost:8080/v1/getAdmin/getAllProjectList", {
        withCredentials: true,
      })
      .then((response) => {
        setProjectList(response.data.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the contributions of this user!",
          error
        );
      });
  };
  useEffect(() => {
    if (context.isLoggedIn) {
      fetchAllproject();
    }
  }, []);

  const handleSaveClick = (param) => {
    axios
      .put(
        "http://localhost:8080/v1/getAdmin/updateProjectname",
        {
          id: param.id,
          project_name: param.row.projectName,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        fetchAllproject();
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the contributions of this user!",
          error
        );
      })
      .finally(() => {
        setSelectedRow(null);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150 },
    {
      field: "projectName",
      headerName: "Project Name",
      minWidth: 250,
      editable: true,
    },
    { field: "isBillable", headerName: "Is Billable", minWidth: 250 },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 150,
      align: "left",
      renderCell: (param) => (
        <Button
          onClick={() => {
            handleSaveClick(param);
          }}
          disabled={selectedRow != param.id}
          startIcon={<SaveIcon />}
        ></Button>
      ),
    },
  ];

  const rows = projectList.map((project) => ({
    id: project.id,
    projectName: project.project_name,
    isBillable: project.is_billable,
  }));

  function mySaveOnServerFunctio(updatedRow) {
    setSelectedRow(updatedRow.id);
  }
  
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
        Project List
      </Typography>
      <Box sx={{ height: 400, maxWidth: "900px" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          sx={{
            "--DataGrid-overlayHeight": "300px",
            [`& .${gridClasses.row}`]: {
              bgcolor: grey[100],
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onCellEditStart={(cellParams) => mySaveOnServerFunctio(cellParams)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        ></DataGrid>
      </Box>
    </Box>
  );
};
export default ProjectList;
