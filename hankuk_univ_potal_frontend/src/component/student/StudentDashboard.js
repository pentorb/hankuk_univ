import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Grade from './Grade';
import InsertCal from './InsertCal';
import Calendar from './Calendar';
import StudentMain from './StudentMain';
import HuehakInsert from './HuehakInsert';
import BokhakInsert from './BokhakInsert';
import ResSemester from './ResSemester';
import Header from '../comm/Header';
import AllmyGrades from './AllmyGrades';
import Appeal from './Appeal';
import CreditsList from './CreditsList';
import AppealList from './AppealList';
import AppealDetail from './AppealDetail';
import LectureList from './LectureList';

const StudentDashboard = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={2}>
                        <StudentSidebar />
                    </Grid>
                    <Grid item xs={10} sx={{ backgroundColor: "#DDE1E8" }}>                        
                        <Routes>
                            <Route path="/regHuehak" element={<HuehakInsert/>}></Route>
                            <Route path="/regBokhak" element={<BokhakInsert/>}></Route>
                            <Route path="/resSemester" element={<ResSemester/>}></Route>
                            <Route path="/" element={<StudentMain/>}></Route>
                            <Route path="/check-grade" element={<Grade/>}></Route>
                            <Route path="/make-appeal" element={<Appeal/>}></Route>
                            <Route path="/appeal-list" element={<AppealList/>}></Route>
                            <Route path="/appeal-detail/:appNo" element={<AppealDetail />} />
                            <Route path="/lecture" element={<LectureList />} />
                            <Route path="/insert-calendar" element={<InsertCal/>}></Route>
                            <Route path="/calendar" element={<Calendar/>}></Route>
                            <Route path="/my-grade" element={<AllmyGrades/>}></Route>
                            <Route path="/credits" element={<CreditsList/>}></Route>
                        </Routes>
                    </Grid>
                   
                </Grid>
            </Box>
        </>
    )
}

export default StudentDashboard;