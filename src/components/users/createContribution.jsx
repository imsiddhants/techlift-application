import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const MyForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    Hours: "",
    Message: "",
    Quarter: "",
    Status: "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/v1/getuser/getAllProjects", {
        withCredentials: true,
      })
      .then((response) => {
        setProjects(response.data.projectNames);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/v1/getuser/addHoursInOrgContribution",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status == 200) alert("contribution succesfully created");
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("contribution for this project already exists ..!!");
        }
      })
      .finally(() => {
        setFormData({
          projectName: "",
          Hours: "",
          Message: "",
          Quarter: "",
          Status: "",
        });
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "30px",
          border: "1px solid black",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Contributions
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="projectName"
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              },
            }}
            autoFocus
          >
            {projects.map((project) => (
              <MenuItem key={project} value={project}>
                {project}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Hours"
            label="Hours"
            name="Hours"
            autoComplete="Hours"
            value={formData.Hours}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Message"
            label="Message"
            name="Message"
            autoComplete="Message"
            value={formData.Message}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="quarter-label">Quarter</InputLabel>
            <Select
              labelId="quarter-label"
              id="Quarter"
              name="Quarter"
              value={formData.Quarter}
              onChange={handleChange}
              label="Quarter"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Q1"}>Q1</MenuItem>
              <MenuItem value={"Q2"}>Q2</MenuItem>
              <MenuItem value={"Q3"}>Q3</MenuItem>
              <MenuItem value={"Q4"}>Q4</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="Status"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Draft"}>Draft</MenuItem>
              <MenuItem value={"Pending"}>Send</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MyForm;
