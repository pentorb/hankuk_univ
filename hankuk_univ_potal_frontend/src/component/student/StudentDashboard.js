import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Routes, Route} from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import Grade from './Grade';
import InsertCal from '../comm/InsertCal';
import Calendar from '../comm/Calendar';
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
import Lecture from './Lecture';
import Syllabus from './Syllabus';
import HomeworkList from './HomeworkList';
import Homework from './Homework';
import HomeworkDetail from './HomeworkDetail';
import Attendance from './Attendance';
import Absence from './Absence';
import AbsenceDetail from './AbsenceDetail';
import MyPage from './MyPage';
import LectureVideo from './LectureVideo';

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
                            <Route path="/:lecNo/content" element={<Lecture />} />
                            <Route path="/:lecNo/syllabus" element={<Syllabus />} />
                            <Route path="/:lecNo/attendance" element={<Attendance />} />
                            <Route path="/:lecNo/report-absence" element={<Absence />} />
                            <Route path="/:lecNo/absence/:absNo" element={<AbsenceDetail />} />
                            <Route path="/:lecNo/homework" element={<HomeworkList />} />
                            <Route path="/:lecNo/sumbit-homework" element={<Homework/>} />
                            <Route path="/:lecNo/homework/:hwNo" element={<HomeworkDetail/>}/>
                            <Route path="/:lecNo/content/video" element={<LectureVideo />} />
                            <Route path="/insert-calendar" element={<InsertCal/>}></Route>
                            <Route path="/calendar" element={<Calendar/>}></Route>
                            <Route path="/my-grade" element={<AllmyGrades/>}></Route>
                            <Route path="/credits" element={<CreditsList/>}></Route>
                            <Route path="/mypage" element={<MyPage/>}></Route>
                        </Routes>
                    </Grid>
                   
                </Grid>
            </Box>
        </>
    )
}

export default StudentDashboard;