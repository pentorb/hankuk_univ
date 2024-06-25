import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import Collapse from '@mui/material/Collapse';
import '../../config/activeTab.css';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfessorSidebar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  const handleFirstClick = () => {
    setFirstOpen(!firstOpen);
  };

  const handleSecondClick = () => {
    setSecondOpen(!secondOpen);
  };

  const handleThirdClick = () => {
    setThirdOpen(!thirdOpen);
  };



  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ backgroundColor: "#435480", height: "120vh" }}>
          <Tabs orientation="vertical" aria-label="icon label tabs example" value={false}>
            <Tab icon={<PersonIcon sx={{ fontSize: 50 }} />} 
                 label={<span style={{ fontWeight: 'bold' }}>마이페이지</span>} id={1 === activeTab ? "active" : ""}
                 onClick={() => {setActiveTab(1); navigate("/professor/");}} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />

            <Tab icon={<LaptopChromebookIcon sx={{ fontSize: 50 }} />} 
                 label={<span style={{ fontWeight: 'bold' }}>수업</span>} id={2 === activeTab ? "active" : ""}
                 onClick={() => {setActiveTab(2); navigate("/professor/");}} sx={{ color: "white", paddingLeft: 0, paddingRight: 0 }} />
                 
            <Tab icon={<MenuBookIcon sx={{ fontSize: 50 }} />} 
                 label={<Typography sx={{ fontWeight: 'bold' }}>과목</Typography>} id={3 === activeTab ? "active" : ""}
                 onClick={() => {setActiveTab(3); navigate("/professor/lectureDashboard");}} sx={{ color: "white" }} />

            <Tab icon={<CalendarMonthIcon sx={{ fontSize: 50 }} />} 
                 label={<Typography sx={{ fontWeight: 'bold' }}>캘린더</Typography>} id={4 === activeTab ? "active" : ""}
                 onClick={() => {setActiveTab(4); navigate("/professor/calendar");}} sx={{ color: "white" }} />
          </Tabs>
        </Grid>
        <Grid item xs={8} backgroundColor={"#FFFFFF"}>
        {activeTab === 0 &&
            <>
              <Link to="/professor/" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 0} onClick={(e) => handleListItemClick(e, 0)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="대시보드" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 1 &&
            <>
              <Link to="/professor/" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 1} onClick={(e) => handleListItemClick(e, 1)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="마이페이지" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 2 && 
            <>
              <Link to="/professor/lectureDashboard" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 2} onClick={(e) => {setActiveTab(3); handleListItemClick(e, 2)}} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의대시보드" />
                </ListItemButton>
              </Link>
              <Link to="/professor/lectureList" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 3} onClick={(e) => handleListItemClick(e, 3)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의계획서" />
                </ListItemButton>
              </Link>
              <Link to="/professor/scoreList" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 4} onClick={(e) => handleListItemClick(e, 4)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="성적조회" />
                </ListItemButton>
              </Link>
            </>
          } 
          {activeTab === 3 &&
            <>
              <Link to="/professor/contents" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 5} onClick={(e) => handleListItemClick(e, 5)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의콘텐츠" />
                </ListItemButton>
              </Link>
              <Link to="/professor/syllabusFile" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 6} onClick={(e) => handleListItemClick(e, 6)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="강의계획서" />
                </ListItemButton>
              </Link>
              <Link to="/professor/attendanceManage" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 7} onClick={(e) => handleListItemClick(e, 7)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="출결관리" />
                </ListItemButton>
              </Link>
              <Link to="/professor/examQuestionForm" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 8} onClick={(e) => handleListItemClick(e, 8)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="시험출제" />
                </ListItemButton>
              </Link>
              <Link to="/professor/gradeManage" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 9} onClick={(e) => handleListItemClick(e, 9)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="성적관리" />
                </ListItemButton>
              </Link>
              <Link to="/professor/appealList" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 10} onClick={(e) => handleListItemClick(e, 10)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="이의신청목록" />
                </ListItemButton>
              </Link>
              <Link to="/professor/absenceList" style={{ textDecoration: "none", color: 'black' }}>
                <ListItemButton selected={selectedIndex === 11} onClick={(e) => handleListItemClick(e, 11)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="공결신청목록" />
                </ListItemButton>
              </Link>
            </>}
          {activeTab === 4 &&
            <>
              <Link to="/professor/calendar" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 12} onClick={(e) => handleListItemClick(e, 12)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="일정 조회" />
                </ListItemButton>
              </Link>
              <Link to="/professor/insert-calendar" style={{ textDecoration: "none", color: "black" }}>
                <ListItemButton selected={selectedIndex === 13} onClick={(e) => handleListItemClick(e, 13)} sx={{ pl: 3, borderRadius: 10, width: 180 }}>
                  <ListItemText primary="일정 등록" />
                </ListItemButton>
              </Link>
            </>}
        </Grid>
      </Grid>
    </>

  );
}