import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfessorSidebar from './ProfessorSidebar';
import { Routes, Route } from 'react-router-dom';
import LectureList from './LectureList';
import ExamQuestionForm from './ExamQuestionForm';
import LectureWrite from './LectureWrite';
import LectureModify from './LectureModify';
import Header from '../comm/Header';
import ProfMain from './ProfMain';
import Contents from './Contents';
import LectureDashboard from './LectureDashboard';
import HomeworkWrite from './HomeworkWrite';
import HomeworkModify from './HomeworkModify';
import LessonDataWrite from './LessonDataWrite';
import LessonDataModify from './LessonDataModify';
import AttendanceManage from './AttendanceManage';
import GradeManage from './GradeManage';
import AppealList from './AppealList';
import AppealDetail from './AppealDetail';
import AbsenceList from './AbsenceList';
import AbsenceDetail from './AbsenceDetail';
import Calendar from '../comm/Calendar';
import InsertCal from '../comm/InsertCal';
import HomeworkSubmitList from './HomeworkSubmitList';
import SyllabusFile from './SyllabusFile';
import ScoreList from './ScoreList';
import MyPage from './MyPage';


const ProfessorDashboard = () => {
    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={2}>
                        <ProfessorSidebar />
                    </Grid>
                    <Grid item xs={10} sx={{ backgroundColor: "#DDE1E8" }}>
                        <Routes>
                            <Route path="/" element={<ProfMain/>}></Route>
                            <Route path="/myPage" element={<MyPage/>}></Route>
                            <Route path="/lectureList" element={<LectureList/>}></Route>
                            <Route path="/lectureWrite" element={<LectureWrite/>}></Route>
                            <Route path="/lectureModify/:lecNo" element={<LectureModify/>}></Route>
                            <Route path="/scoreList" element={<ScoreList/>}></Route>
                            <Route path="/lectureDashboard" element={<LectureDashboard/>}></Route>
                            <Route path="/contents" element={<Contents/>}></Route>
                            <Route path="/homeworkWrite/:week/:lecNo" element={<HomeworkWrite/>}></Route>
                            <Route path="/homeworkModify/:hwNo" element={<HomeworkModify/>}></Route>
                            <Route path="/homeworkSubmitList/:hwNo/:week/:lessonCnt" element={<HomeworkSubmitList/>}></Route>
                            <Route path="/lessonDataWrite/:week/:lecNo" element={<LessonDataWrite/>}></Route>
                            <Route path="/lessonDataModify/:ldNo" element={<LessonDataModify/>}></Route>
                            <Route path="/syllabusFile" element={<SyllabusFile/>}></Route>
                            <Route path="/attendanceManage" element={<AttendanceManage/>}></Route>
                            <Route path="/examQuestionForm" element={<ExamQuestionForm/>}></Route>
                            <Route path="/gradeManage" element={<GradeManage/>}></Route>
                            <Route path="/appealList" element={<AppealList/>}></Route>
                            <Route path="/appealDetail" element={<AppealDetail/>}></Route>
                            <Route path="/absenceList" element={<AbsenceList/>}></Route>
                            <Route path="/absenceDetail" element={<AbsenceDetail/>}></Route>
                            <Route path="/calendar" element={<Calendar/>}></Route>
                            <Route path="/insert-calendar" element={<InsertCal/>}></Route>
                        </Routes>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ProfessorDashboard;