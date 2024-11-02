import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import AuthContext from "../authContext/authContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  gridClasses,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";

const AllContributionOfuser = () => {
  const context = useContext(AuthContext);
  const [allContributions, setAllContributions] = useState([]);
  const [project, setAllProject] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const fetchUserContribution = () => {
    axios
      .get(
        "http://localhost:8080/v1/getuser/AllcontributionOfuser",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAllContributions(response.data.data.allContribution);
        setAllProject(response.data.data.Project);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the contributions of this user!",
          error
        );
      });
  };

  const deleteContribution = (id) => {
    axios
      .delete(
        "http://localhost:8080/v1/getuser/deleteuserContributionData",
        {
          data: { id: id },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        fetchUserContribution();
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
      fetchUserContribution();
    }
  }, [context.isLoggedIn]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleCancelClick = (id) => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const handleSaveClick = (id) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => {
    deleteContribution(id);
  };
  const processRowUpdate = (newRow, oldRow) => {
    console.log(oldRow);
    axios
      .put(
        "http://localhost:8080/v1/getuser/updateuserContributionData",
        {
          id: newRow.id,
          hours: newRow.hours,
          message: newRow.message,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          fetchUserContribution();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 40 },
    { field: "projectName", headerName: "Project Name", minWidth: 120 },
    { field: "hours", headerName: "Hours", minWidth: 120, editable: true },
    { field: "message", headerName: "Message", minWidth: 120, editable: true },
    { field: "day", headerName: "Day", minWidth: 120 },
    { field: "status", headerName: "Status", minWidth: 120 },
    { field: "date", headerName: "Date", minWidth: 170 },

    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      minWidth: 150,
      cellClassName: "actions",
      getActions: (param) => {
        const id = param.row.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`save-${id}`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => {
                handleSaveClick(id);
              }}
            />,
            <GridActionsCellItem
              key={`cancel-${id}`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              color="inherit"
              onClick={() => {
                handleCancelClick(id);
              }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              handleEditClick(id);
            }}
            disabled={param.row.status != "Draft"}
            color="primary"
          />,

          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            onClick={() => {
              handleDeleteClick(id);
            }}
            disabled={param.row.status === "Pending"}
            label="Delete"
            color="error"
          />,
        ];
      },
    },
  ];

  const rows = allContributions.map((user) => ({
    id: user.id,
    projectName: project[user.project_id - 1].project_name,
    hours: user.hours,
    message: user.message,
    day: user.day,
    status: user.status,
    date: user.applied_date,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
        All contributions
      </Typography>
      <Box sx={{ height: 450 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          onRowEditStop={handleRowEditStop}
          onProcessRowUpdateError={(error) => {
            console.log(error.message);
          }}
          onRowDoubleClick={(params, event) => {
            event.defaultMuiPrevented = true;
          }}
          onCellDoubleClick={(params, event) => {
            event.defaultMuiPrevented = true;
          }}
          onCellKeyDown={(params, event) => {
            event.defaultMuiPrevented = true;
          }}
          sx={{
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

export default AllContributionOfuser;
