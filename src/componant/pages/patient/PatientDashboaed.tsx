import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

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
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:3000/patientAppointments');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppointments(data.patientAppointments);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upcoming Appointments
            </Typography>
            <List>
                {appointments.map((appointment) => (
                    <ListItem key={appointment.id}>
                        <ListItemText
                            primary={`${appointment.patientName} with ${appointment.doctorName}`}
                            secondary={`Date: ${appointment.selectedDate}, Time: ${appointment.availableTimeSlot}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UpcomingAppointments;
