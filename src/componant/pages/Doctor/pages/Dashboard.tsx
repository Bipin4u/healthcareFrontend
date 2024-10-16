import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeftNavigation from './LeftNavigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [todaysAppointments, setTodaysAppointments] = useState<any[]>([]);
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config ={
          headers:{
            Authorization:"Bearer test 12344"
          }
        }
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

        const recentPatientsList = patientsResponse.data.slice(0, 5).map((patient: any) => ({
          name: patient.name,
          lastVisit: patient.appointment_details[patient.appointment_details.length - 1]?.date || 'N/A',
          id: patient.id
        }));
        setRecentPatients(recentPatientsList);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewProfile = (patientId: number) => {
    console.log('View profile for patient ID:', patientId);
  };

  return (
    <div className="dashboard">
      <LeftNavigation />
      <div className="dashboard-content">
        <div className="header">
          {doctorName && <h2>Welcome, Dr. {doctorName},</h2>}
        </div>
        <div className='heading'>
        <Typography  variant="h5" gutterBottom>
          Today's Appointments
        </Typography>
        </div>
      
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
<div className='heading1'>  <Typography variant="h5" gutterBottom>
          Recent Patients
        </Typography></div>
       
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Last Visit</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPatients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      onClick={() => handleViewProfile(patient.id)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
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
