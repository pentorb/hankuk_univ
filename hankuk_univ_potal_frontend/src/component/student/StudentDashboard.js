import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavigationBar from '../NavigationBar';
import StudentSidebar from './StudentSidebar';
import Grade from './Grade';

const StudentDashboard = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <NavigationBar />
                    </Grid>
                    <Grid item xs={2}>
                        <StudentSidebar />
                    </Grid>
                    <Grid item xs={10} sx={{ backgroundColor: "#DDE1E8" }}>
                        {/* Your component here */}
                        <Grade/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StudentDashboard;