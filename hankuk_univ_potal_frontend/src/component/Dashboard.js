import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavigationBar from './NavigationBar';
import StudentSidebar from './student/StudentSidebar';

const Dashboard2 = () => {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <NavigationBar/>
                    </Grid>
                    <Grid item xs={2}>
                        <StudentSidebar/>
                    </Grid>
                    <Grid item xs={10}>                 
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}




export default Dashboard2;