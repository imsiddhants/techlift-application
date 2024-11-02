import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const ProjectUploadForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    address: "",
    isBillable: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/v1/getAdmin/uploadingProject",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("uploaded succesfully");
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setFormData({
          clientName: "",
          projectName: "",
          address: "",
          isBillable: false,
        });
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop="120px"
      // alignItems="center"
      // height="100vh"
    >
      <Paper elevation={2} style={{ maxWidth: 600, padding: 20 }}>
        <Typography variant="h5" gutterBottom align="centre">
          Create Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isBillable}
                    onChange={handleChange}
                    name="isBillable"
                    color="primary"
                  />
                }
                label="Is Billable"
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProjectUploadForm;
