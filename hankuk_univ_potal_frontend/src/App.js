import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import ProfessorDashboard from './component/professor/ProfessorDashboard';
import StaffDashboard from './component/staff/StaffDashboard';
import Main from './component/comm/Main';
import { Routes, Route} from 'react-router-dom';
import BoardNav from './component/comm/BoardNav';
import Login from './component/comm/Login';
import AccessedMain from './component/comm/AccessedMain';
import CourseRegistrationMain from './component/course/CourseRegistrationMain';
import NoticeWrite from './component/NoticeWrite';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/main" element={<AccessedMain />} />
      <Route exact path='/noticeBoard' element={<BoardNav />} />
      
      <Route exact path="/professor/*" element={<ProfessorDashboard />} />
      <Route exact path="/staff/*" element={<StaffDashboard />} />
      <Route exact path="/student/*" element={<StudentDashboard />} />
      <Route exact path="/course-registration/*" element={<CourseRegistrationMain/>} />
    </Routes>
  );
}

export default App;
