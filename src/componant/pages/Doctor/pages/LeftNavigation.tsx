import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import '../styles/LeftNavigation.css';;

const LeftNavigation: React.FC = () => {
  return (
    <div className="left-navigation">
      <Typography variant="h6">Bayer Health</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Patient List" />
        </ListItem>
        <ListItem >
          <ListItemText primary="Appointments" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default LeftNavigation;
