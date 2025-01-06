import { Autocomplete, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import api from "../../utils/api";
import { UserContext } from "../../context/loginContext";

export default function AdminHome() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {state} = useContext(UserContext);

  async function registerUser() {
    if(!fullName || !email || !password || !role) {
      alert("Please fill all the fields");
      return;
    }

    const response = await api.post(
      "/users/v1/register",
      {
        fullName,
        email,
        password,
        role: role.trim().toLowerCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      }
    )

    if(response.status === 201) {
      alert("User registered successfully");
    }

  }

  return (
    <Container>
      <Typography variant="h3">Admin Home</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
        width: "75%",
        alignSelf: "center",
        margin: "20px auto",
      }}>
        <TextField onChange={(e) => {
          setFullName(e.target.value);
        }} label="Full Name" type="text" />
        <TextField onChange={(e) => {
          setEmail(e.target.value);
        }} label="Email" type="email" />
        <TextField onChange={(e) => {
          setPassword(e.target.value);
        }} label="Password" type="password" />
        <Autocomplete options={[
          "Admin",
          "Teacher",
          "Student",
        ]} renderInput={(params) => <TextField {...params} label="Role" />} onChange={(e, v) => {
          setRole(v);
        }} />
        <Button variant="contained" onClick={registerUser}>Register</Button>
      </Box>
    </Container>
  )

}
