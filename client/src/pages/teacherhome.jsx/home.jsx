import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../../utils/api";
import {UserContext} from '../../context/loginContext';

export default function Home() {
  const { state } = useContext(UserContext);
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [scienceMarks, setScienceMarks] = useState("");
  const [mathsMarks, setMathsMarks] = useState("");
  const [englishMarks, setEnglishMarks] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await api.get("/users/v1/students", {
          headers: {
            Authorization: `Bearer ${state?.token}`, 
          },
        });
        if (response.data && Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again later.");
      }
    }
    fetchStudents();
  }, [state?.token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      studentId,
      marks: {
        science: Number(scienceMarks),
        maths: Number(mathsMarks),
        english: Number(englishMarks),
      },
    };

    try {
      const response = await api.post("/marks/v1", data, {
        headers: {
          Authorization: `Bearer ${state?.token}`, 
        },
      });
      if (response.status === 201) {
        alert("Marks submitted successfully!");
      } else {
        setError("Failed to submit marks. Please try again.");
      }
    } catch (err) {
      console.error(err);
      
    } 
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Teacher's Dashboard
        </Typography>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="student-select-label">Select Student</InputLabel>
                <Select
                  labelId="student-select-label"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                >
                  {students.map((student) => (
                    <MenuItem key={student._id} value={student._id}>
                      {student.fullName} ({student.email})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Science
              </Typography>
              <TextField
                fullWidth
                label="Enter Science Marks"
                variant="outlined"
                value={scienceMarks}
                onChange={(e) => setScienceMarks(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Maths
              </Typography>
              <TextField
                fullWidth
                label="Enter Maths Marks"
                variant="outlined"
                value={mathsMarks}
                onChange={(e) => setMathsMarks(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                English
              </Typography>
              <TextField
                fullWidth
                label="Enter English Marks"
                variant="outlined"
                value={englishMarks}
                onChange={(e) => setEnglishMarks(e.target.value)}
                required
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Submit" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
