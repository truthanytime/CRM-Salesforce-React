import { FC } from 'react';
import { Container, Grid, Typography } from '@mui/material';

const Admin: FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} style={{ marginTop: 70 }}>
        <Grid item xs={12}>
          <Typography variant="h2">CRM, coming soon...</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
