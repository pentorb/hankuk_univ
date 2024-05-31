import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudentDashboard from './component/student/StudentDashboard';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StudentDashboard/>
    </ThemeProvider>
  );
}

export default App;
