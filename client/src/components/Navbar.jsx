import React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar sx={{ background: '#111111' }} position='static'>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant='h5'>Technical Store App </Typography>
            <div>
              <Button
                component={Link}
                sx={{ alignItems: 'end', textAlign: 'end' }}
                to="/admin"
                variant='text'
                color='inherit'
              >
                Admin
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
