import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import ProfessorDashboard from './component/professor/ProfessorDashboard';
import StaffDashboard from './component/staff/StaffDashboard';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StudentDashboard/>
      {/* <ProfessorDashboard/> */}
      {/* <StaffDashboard/> */}
    </ThemeProvider>
  );
}

export default App;
