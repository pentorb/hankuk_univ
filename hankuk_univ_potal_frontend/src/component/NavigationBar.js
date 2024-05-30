import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1
     }}>
      <AppBar position="static" sx={{backgroundColor: "white", height:80 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingTop:2, color:'firstColor.main' }} >
            한국대학교
          </Typography>
          {/* <Button color="inherit" sx={{ paddingTop:2 }}>Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}