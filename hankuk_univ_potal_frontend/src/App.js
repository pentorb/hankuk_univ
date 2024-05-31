import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import ProfessorDashboard from './component/professor/ProfessorDashboard';
import StaffDashboard from './component/staff/StaffDashboard';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './config/theme';
import Main from './component/comm/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardNav from './component/comm/BoardNav';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path='/TotalBoardlist' element={<BoardNav />} />
        <Route path="/student-dashboard" element={<ThemeProvider theme={theme}><StudentDashboard /></ThemeProvider>} />
      </Routes>

    </Router>
  );
}

export default App;
