import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  // Use state to manage input values
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signup = async () => {
    // Ensure passwords match
    if (password !== confirmPassword) {
      toast.info("Passwords do not match");
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(response.data);
      toast.success("SignUp Successfully");
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage = error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#616161",
              "&:hover": { backgroundColor: "#4f4f4f" },
              borderRadius: 0,
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
