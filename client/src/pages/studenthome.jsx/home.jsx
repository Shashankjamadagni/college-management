import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, CircularProgress, Paper, Box, Alert } from "@mui/material";
import { UserContext } from "../../context/loginContext";
import api from "../../utils/api"

export default function StudentPage() {
  const { state } = useContext(UserContext);  

  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchStudentMarks() {
      try {
        const response = await api.get(`/marks/v1`, {headers: {
          Authorization: `Bearer ${state?.token}`, 
        },
      }); 
        if (response.status === 200) {
          const marksData = response.data;
          // Sort and set this data in state by createdAt in descending order

          setStudentData(marksData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          
        } else {
          setError("Failed to fetch marks data. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching marks data.");
      } 
      finally {
        setIsLoading(false);
      }
    }

    fetchStudentMarks();
  }, []);


  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Marks Overview
        </Typography>

        {studentData && studentData.length > 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Science: {studentData[0].marks.science}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Maths: {studentData[0].marks.maths}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              English: {studentData[0].marks.english}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
