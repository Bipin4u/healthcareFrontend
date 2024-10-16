// src/components/Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './styles.css'; // Import your CSS file


const Header: React.FC = () => {
  const parrotGreen = '#3DDC84'; // Define parrot green color

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h4">Bayer Healthcare</Typography>
        </Box>
      </Toolbar>
      <Toolbar>
        <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}>
                            <Button color="inherit">Home</Button>
                              <Button color="inherit">Health Topics</Button>
          <Button color="inherit">Resources</Button>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact</Button>
                  </Box>
              </Toolbar>
              <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
               <Typography variant="h4">Your Health, Our Priority
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
          Explore the latest health information and resources from Bayer Healthcare
        </Typography>

          </Box>
    </AppBar>
  );
};

export default Header;
