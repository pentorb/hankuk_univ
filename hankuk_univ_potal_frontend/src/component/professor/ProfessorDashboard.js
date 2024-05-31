import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavigationBar from '../NavigationBar';
import ProfessorSidebar from './ProfessorSidebar';
import Example from './Example';

const ProfessorDashboard = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <NavigationBar />
                    </Grid>
                    <Grid item xs={2}>
                        <ProfessorSidebar />
                    </Grid>
                    <Grid item xs={10} sx={{ backgroundColor: "#DDE1E8" }}>
                        {/* Your component here */}
                        <Example/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ProfessorDashboard;