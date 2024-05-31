import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavigationBar() {
  return (
    // <Box sx={{ flexGrow: 1
    //  }}>
    //   <AppBar position="static" sx={{backgroundColor: "white", height:80 }}>
    //     <Toolbar sx={{paddingTop:2}}>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'firstColor.main' }} >
    //         <b>한국대학교</b>
    //       </Typography>
    //       <Button>로그인</Button>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
    <div style={{ width: '100%', height: '85px', display: 'flex', margin: '0 auto' }}>
      <img src="/images/logo2.png" style={{ width: '50px', height: '50px', margin: '15px 10px 15px 20px' }} />
      <span style={{ fontSize: "24px", fontFamily: "ChosunLo", color: "var(--maincolor)", margin: '23px 5px 23px 0    ' }}>한국대학교 </span>
      <span style={{ fontSize: "22px", fontWeight: '600', color: "var(--maincolor)", margin: '23px 0' }}>/ 종합학사포탈</span>
    </div>
  );
}