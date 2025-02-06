import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { ApiConstants } from '../api/ApiConstants';
import { toast } from 'react-toastify';
import custom_axios from '../axios/AxiosSetup';

const Login = () => {
  const navigate = useNavigate();

  // Using useState for managing input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginApp = async () => {
    if (email === "" || password === "") {
      toast.info("Please fill in the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.AUTH.LOGIN, {
        email,
        password,
      });
      console.log("Login response:", response.data);

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    window.location.href = "http://localhost:3000/auth/google/login";
    console.log('Google Login');  
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#1e1e1e',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
          padding: 3,
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            loginApp();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ style: { color: '#888' } }}
              InputProps={{
                style: { color: '#fff' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ style: { color: '#888' } }}
              InputProps={{
                style: { color: '#fff' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#616161',
                '&:hover': { backgroundColor: '#4f4f4f' },
              }}
              fullWidth
            >
              Login
            </Button>
          </form>
          <Button
            onClick={handleGoogleLogin}
            variant="outlined"
            color="secondary"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{
              color: '#fff',
              borderColor: '#888',
              '&:hover': {
                borderColor: '#fff',
              },
            }}
          >
            Login with Google
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'underline', color: '#4f92f7' }}>
            Sign Up
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ textDecoration: 'underline', color: '#4f92f7' }}>
            Forgot Password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
