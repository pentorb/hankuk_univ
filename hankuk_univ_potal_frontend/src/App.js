import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import ProfessorDashboard from './component/professor/ProfessorDashboard';
import StaffDashboard from './component/staff/StaffDashboard';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './config/theme';
import Main from './component/comm/Main';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route exect path='/' element={<Main />} />
      <ThemeProvider theme={theme}>
        <StudentDashboard />
      </ThemeProvider>
    </Routes>
  );
}

export default App;
