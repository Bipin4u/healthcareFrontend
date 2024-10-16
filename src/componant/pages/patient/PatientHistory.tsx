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

const PreviousHistory: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patientAppointments")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const today = new Date();
          const past = response.data.filter((appointment: Appointment) => {
            const appointmentDate = new Date(appointment.selectedDate);
            return appointmentDate < today; // Include past dates only
          });
          setAppointments(past);
        } else {
          setError("No previous appointments found.");
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Previous Appointment History
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
          Your Previous Appointments
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
              <ListItemText primary="No previous appointments for Alice Johnson." />
            </ListItem>
          )}
        </List>
      </Box>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default PreviousHistory;
