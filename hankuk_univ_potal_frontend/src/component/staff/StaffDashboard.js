import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import AccountManagement from'./AccountManagement'
import MajorManagement from'./MajorManagement'
import MajorCreate from'./MajorCreate'
import MajorDetail from'./MajorDetail'
import Header from '../comm/Header';
import StaffHuehak from './StaffHuehak';
import Calendar from '../comm/Calendar';
import InsertCal from '../comm/InsertCal';
import LectureApprove from './LectureApprove';

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
                            <Route path="/confirmHuehak" element={<StaffHuehak/>} />
                            <Route path="/AccountManagement" element={<AccountManagement/>}></Route>
                            <Route path="/MajorManagement" element={<MajorManagement/>}></Route>
                            <Route path="/calendar" element={<Calendar/>}></Route>
                            <Route path="/insert-calendar" element={<InsertCal/>}></Route>
                            <Route path="/MajorCreate" element={<MajorCreate/>}></Route> 
                            <Route path="/MajorDetail/:majCd" element={<MajorDetail/>}></Route>
                            <Route path="/LectureApprove" element={<LectureApprove/>}></Route>


                        </Routes>
                    

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StaffDashboard;