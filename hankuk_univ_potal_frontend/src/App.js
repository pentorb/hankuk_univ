import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './component/Dashboard';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './config/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard/> 
    </ThemeProvider>
  );
}

export default App;
