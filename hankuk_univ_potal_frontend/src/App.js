import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import ProfessorDashboard from './component/professor/ProfessorDashboard';
import StaffDashboard from './component/staff/StaffDashboard';
import Main from './component/comm/Main';
import { Routes, Route } from 'react-router-dom';
import BoardNav from './component/comm/BoardNav';

function App() {
  const userType = "student";

  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path='/TotalBoardlist' element={<BoardNav />} />
      {userType === "student" &&
        <Route exact path="/my-potal/*" element={<StudentDashboard />}></Route>
      }
      {userType === "professor" &&
        <Route exact path="/my-potal/*" element={<ProfessorDashboard />}></Route>
      }
      {userType === "staff" &&
        <Route exact path="/my-potal/*" element={<StaffDashboard />}></Route>
      }      
    </Routes>
  );
}

export default App;
