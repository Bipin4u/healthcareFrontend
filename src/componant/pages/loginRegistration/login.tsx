// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/registration');
    };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic here
    try {
      const config = {
        headers: {
          "Authorization": "Bearer test12344"
        }
      }
      const response = await axios.get('http://localhost:3000/users', config);
      const users = response.data;

      const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

      if (user) {
        // Redirect to a welcome page or another route
        navigate('/doctor');
      } else {
        //setError('Invalid email or password');
        setError(true);
      }
    } catch (error) {
      console.error('Error logging in', error);
      setError(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: "0",
        }}
      >
        <Typography variant="h5" className='colorBlue'>Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{color: "red"}}>Email and Password are incorrect</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className='bggreen'
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          <Box mt={2}>
            <Link className='atag colorBlue' onClick={goToRegistration} variant="body2" underline="hover">
              {'If you are a new user, register here'}
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
