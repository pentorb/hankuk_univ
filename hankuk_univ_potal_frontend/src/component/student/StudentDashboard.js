import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import StudentSidebar from './StudentSidebar';
import Grade from './Grade';
import InsertCal from './InsertCal';
import Calendar from './Calendar';
import StudentMain from './StudentMain';
import HuehakInsert from './HuehakInsert';

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
                        <Routes>
                            <Route path="/regHuehak" element={<HuehakInsert/>}></Route>
                            <Route path="/" element={<StudentMain/>}></Route>
                            <Route path="/check-grade" element={<Grade/>}></Route>
                            <Route path="/insert-calendar" element={<InsertCal/>}></Route>
                            <Route path="/calendar" element={<Calendar/>}></Route>
                        </Routes>
                    </Grid>
                   
                </Grid>
            </Box>
        </>
    )
}

export default StudentDashboard;