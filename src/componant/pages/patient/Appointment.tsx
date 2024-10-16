import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointment: React.FC = () => {
    const [doctor, setDoctor] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [timeSlot, setTimeSlot] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validation
        if (!doctor || !date || !timeSlot) {
            setErrorMessage('Please fill in all required fields.');
            setOpenSnackbar(true);
            return;
        }

        if (new Date(date) < new Date()) {
            setErrorMessage('Selected date cannot be in the past.');
            setOpenSnackbar(true);
            return;
        }

        const appointmentData = {
            doctorName: doctor,
            patientName: "Alice Johnson",
            selectedDate: date,
            availableTimeSlot: timeSlot,
            reason,
            notes,
        };

      
        axios.post('http://localhost:5000/patientAppointments', appointmentData)
            .then((response) => {
                console.log('Appointment successfully created:', response.data);
                navigate('/')
                
                setDoctor('');
                setDate('');
                setTimeSlot('');
                setReason('');
                setNotes('');
                
            })
            .catch((error) => {
                console.error('There was an error creating the appointment:', error);
            });
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container
            maxWidth="sm"
            style={{
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h4" gutterBottom align="center">
                Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
                            <Select
                                labelId="doctor-select-label"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Select a doctor</em>
                                </MenuItem>
                                <MenuItem value="Dr. John Smith">Dr. John Smith</MenuItem>
                                <MenuItem value="Dr. Emily Clark">Dr. Emily Clark</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Enter Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            inputProps={{
                                min: new Date().toISOString().split("T")[0], // Disable past dates
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Available Time Slots
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((slot) => (
                                <Button
                                    key={slot}
                                    variant="outlined"
                                    color={timeSlot === slot ? 'primary' : 'secondary'}
                                    style={{ margin: '5px' }}
                                    onClick={() => setTimeSlot(slot)}
                                >
                                    {slot}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Reason for Visit"
                            fullWidth
                            margin="normal"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Additional Notes (Optional)"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Submit Appointment
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Appointment;
