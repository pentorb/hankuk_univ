import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavigationBar() {
  return (
    <Box sx={{ flexGrow: 1
     }}>
      <AppBar position="static" sx={{backgroundColor: "white", height:80 }}>
        <Toolbar sx={{paddingTop:2}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'firstColor.main' }} >
            <b>한국대학교</b>
          </Typography>
          <Button>로그인</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}