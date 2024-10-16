import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Appointment {
  id: number;
  doctorName: string;
  patientName: string;
  selectedDate: string;
  availableTimeSlot: string;
}

const UpcomingAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patientAppointments")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const today = new Date();
          const upcoming = response.data.filter((appointment: Appointment) => {
            const appointmentDate = new Date(appointment.selectedDate);
            return appointmentDate >= today; // Include today and future dates
          });
          setAppointments(upcoming);
        } else {
          setError("No appointments found.");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.patientName === "Alice Johnson"
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          backgroundColor: "#1976d2",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          color: "white",
          alignItems: "left",
          alignContent: "left",
          textAlign: "left",
        }}
      >
        <Typography style={{ marginBottom: "20px" }} variant="h6" gutterBottom>
          Bayer Health
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              Book Appointment
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              My Profile
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              Appointments
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              Health Records
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              Messages
            </Link>
          </div>
          <div>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/apoinment"
            >
              Logout
            </Link>
          </div>
        </Box>
      </Box>
      <div  style={{width:"100%"}}>
        <Container>
          <Typography style={{ margin: "20px", width:"100%" }} variant="h4" gutterBottom>
            Welcome, Alice
          </Typography>
          <Box
            sx={{
              padding: 2,
              borderRadius: 1,
              boxShadow: 2,
              backgroundColor: "background.paper",
              margin: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upcoming Appointments
            </Typography>
            <List>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemText
                      primary={`${appointment.patientName} with ${appointment.doctorName}`}
                      secondary={`Date: ${appointment.selectedDate}, Time: ${appointment.availableTimeSlot}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No upcoming appointments for Alice Johnson." />
                </ListItem>
              )}
            </List>
          </Box>
          <Box 
            sx={{ 
                padding: '16px', 
                borderRadius: '8px', 
                boxShadow: 3, // Adjust the shadow intensity as needed
                backgroundColor: '#fff', // White background for contrast
                margin: '16px 0', // Add margin for spacing
                textAlign:"left"
            }}
        >
            <Typography variant="h6">Health Tip of the Day</Typography>
            <Typography variant="body1">Stay hydrated! Aim to drink at least 8 glasses of water per day.</Typography>
        </Box>
          
          <Container style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                marginRight: "10px",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              See Previous History
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              
            >
             <Link style={{textDecoration:"none", color:"white"}} to="/apoinment"> Book Appointment</Link>
            </Button>
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
