
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';


const Main: React.FC = () => {
    
  return (
    <Container maxWidth="lg">
      <Box my={4}>
                <Typography variant="h5" gutterBottom>
          Featured Health Topics
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: 'COVID-19 Updates', description: 'Stay informed about the latest COVID-19 guidelines and vaccination information.' },
            { title: 'Heart Health', description: 'Discover tips and information for maintaining a healthy heart and cardiovascular system.' },
            { title: 'Mental Wellness', description: 'Explore resources and support options for maintaining good mental health.' },
            { title: 'Nutrition & Diet', description: 'Learn about balanced nutrition and healthy eating habits for overall wellbeing.' },
          ].map((topic, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{topic.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {topic.description}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom>
          Latest Health News
        </Typography>
        {[
          { title: 'Bayer Launches New Initiative for Preventive Healthcare', description: 'Our new program aims to promote regular health check-ups and early disease detection.' },
          { title: 'Understanding the Importance of Vaccinations', description: 'Learn why vaccinations are crucial for individual and community health.' },
        ].map((news, index) => (
          <Card key={index} style={{ margin: '20px 0' }}>
            <CardContent>
              <Typography variant="h6">{news.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {news.description}
              </Typography>
              <Button variant="contained" color="primary">
                Read Full Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Main;
