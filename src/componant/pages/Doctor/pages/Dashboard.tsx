import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftNavigation from './LeftNavigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [todaysAppointments, setTodaysAppointments] = useState<any[]>([]);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get('http://localhost:3000/patients');
        const doctorsResponse = await axios.get('http://localhost:3000/doctors');

        const today = new Date().toISOString().split('T')[0]; 
        const appointments = patientsResponse.data.map((patient: any) => {
          return patient.appointment_details.filter((appointment: any) => appointment.date === today).map((appointment: any) => ({
            patientName: patient.name,
            time: appointment.time,
            notes: appointment.notes,
            doctorName: appointment.doctor_name,
          }));
        }).flat();

        setTodaysAppointments(appointments);
        
        
        if (doctorsResponse.data.length > 0) {
          setDoctorName(doctorsResponse.data[0].name); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <LeftNavigation />
      <div className="dashboard-content">
        {doctorName && <h2>Welcome, Dr. {doctorName}!</h2>}
        
        <Typography variant="h5" gutterBottom>
          Today's Appointments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todaysAppointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.notes}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
