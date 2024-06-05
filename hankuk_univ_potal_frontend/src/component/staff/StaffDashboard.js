import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StaffSidebar from './StaffSidebar';
import Example from './Example';
import Header from '../comm/Header';

const StaffDashboard = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={2}>
                        <StaffSidebar />
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

export default StaffDashboard;