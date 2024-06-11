import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import AccountManagement from'./AccountManagement'
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
                        <Routes>
                            <Route path="/AccountManagement" element={<AccountManagement/>}></Route>
                        </Routes>
                    

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StaffDashboard;