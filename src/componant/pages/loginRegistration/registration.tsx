// Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Link,
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>(''); // Default to 'patient'
  const [doctorID, setDoctorID] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle registration logic here
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('User Type:', userType);
    console.log('DoctorID:', doctorID);
    if(doctorID.length < 11) {
        setError(true);
    }
    if(error){
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserType("");
    setDoctorID("");
    setError(false);
    }
  };

  const checkDoctorID = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("Rajeshdn", event.target.value);
    setDoctorID(event.target.value);
    
  };

  //setDoctorSpecialty(e.target.value)

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: "0",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" className='colorBlue'>Register</Typography>
        <form onSubmit={handleRegister} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="userType">User Type</InputLabel>
            <Select
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
              }}
              id="userType"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
          {userType === 'doctor' && (
            <TextField
              margin="normal"
              fullWidth
              label="Doctor ID"
              value={doctorID}
              required
              onChange={checkDoctorID}
            />
          )}
          {error && <p style={{color: "red"}}>Please Enter the correct Doctor ID</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 }}
            className="bggreen"
          >
            Register
          </Button>
        </form>
        <Link className='atag colorBlue' onClick={goToLogin} variant="body2" underline="hover">
              {'login'}
        </Link>
      </Box>
    </Container>
  );
};

export default Register;
