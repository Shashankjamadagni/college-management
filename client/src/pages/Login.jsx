import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/loginContext";
import api from "../utils/api";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function Login() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { setState } = userContext;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loginUser(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/users/v1/login", { email, password });

      if (response.status === 200) {
        const { user, token } = response.data;

        setState({
          user,
          token,
          isAuthenticated: true,
        });

        if (user.role === "student") {
          navigate("/studenthome");
        } else if (user.role === "teacher") {
          navigate("/teacherhome");
        } else if (user.role === "admin") {
          navigate("/adminhome");
        } else {
          setError("Unknown role. Please contact support.");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Login to your account
        </Typography>

        <Box
          component="form"
          onSubmit={loginUser}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
