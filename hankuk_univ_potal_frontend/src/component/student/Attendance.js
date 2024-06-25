import { Typography, Paper, Button, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom, lectureNameAtom, lectureNumberAtom, selectedNumberAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const Attendance = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const lectureName = useAtomValue(lectureNameAtom);
    const lectureNumber = useAtomValue(lectureNumberAtom);
    const [attendanceList, setAttendanceList] = useState([]);
    const [attendanceCount, setAttendanceCount] = useState({ presence: '', lateness: '', absence: '', approvedAbsence: '' });
    const setSelectedNumber = useSetAtom(selectedNumberAtom);
    const navigate = useNavigate();

    useEffect(() => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", lectureNumber);

        const attendanceUrl = `${url}/attendance`;
        axios.post(attendanceUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setAttendanceList([...res.data.attendanceList])
                setAttendanceCount({ ...res.data.attendanceCount })
            })
            .catch(err => {
                console.log(err);
                setAttendanceList(null)
            })
    }, [member.id, lectureNumber, token]);
    
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>출결 현황</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>출결 현황</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid item container>
                    <Grid item xs={12} sx={{ height: 50 }} />
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <div>
                            <Typography sx={{ float: "left", color: "blue" }}>출석 {attendanceCount.presence}</Typography>
                            <Typography sx={{ float: "left" }}>&nbsp;&nbsp;/&nbsp;&nbsp;</Typography>
                            <Typography sx={{ float: "left", color: "orange" }}>지각 {attendanceCount.lateness}</Typography>
                            <Typography sx={{ float: "left" }}>&nbsp;&nbsp;/&nbsp;&nbsp;</Typography>
                            <Typography sx={{ float: "left", color: "red" }}>결석 {attendanceCount.absence}</Typography>
                            <Typography sx={{ float: "left" }}>&nbsp;&nbsp;/&nbsp;&nbsp;</Typography>
                            <Typography sx={{ float: "left", color: "blue" }}>공결 {attendanceCount.approvedAbsence}</Typography>
                        </div>
                        <TableContainer component={Paper} sx={{ marginTop: 5, marginBottom: 10 }}>
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: "white" }}>주차</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>차시</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>출결현황</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>공결신청</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendanceList && attendanceList.length > 0 ? (
                                        attendanceList.map(attendance => (
                                            <TableRow key={attendance.number}>
                                                {attendance.count === 1
                                                    ? <TableCell align="center" rowSpan={2} sx={{ width: "20%" }}>{attendance.week}</TableCell>
                                                    : null
                                                }
                                                <TableCell align="center" sx={{ width: "20%" }}>{attendance.count}</TableCell>
                                                {attendance.status === "결석" ? <TableCell align="center" sx={{ width: "30%", color: "#FF0000" }}>{attendance.status}</TableCell>
                                                    : attendance.status === "지각" ? <TableCell align="center" sx={{ width: "30%", color: "#FFA500" }}>{attendance.status}</TableCell>
                                                        : <TableCell align="center" sx={{ width: "30%" }}>{attendance.status}</TableCell>
                                                }
                                                <TableCell align="center" sx={{ width: "30%", paddingTop: 0, paddingBottom: 0 }}>
                                                    {(attendance.possibilityOfReport === true && attendance.report === true) &&
                                                        <Button variant="contained"
                                                            size="small"
                                                            onClick={() => { setSelectedNumber(attendance.lessonNo); navigate(`/student/${lectureNumber}/absence/${attendance.absNo}`); }}
                                                            sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 90 }}>보기</Button>
                                                    }
                                                    {(attendance.possibilityOfReport === true && attendance.report === false) &&
                                                        <Button variant="contained"
                                                            size="small"
                                                            onClick={() => { setSelectedNumber(attendance.lessonNo); navigate(`/student/${lectureNumber}/report-absence`); }}
                                                            sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width: 90 }}>신청</Button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell align="center" colSpan={4}>출석 현황이 없습니다</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <br />
            </Paper>
        </Grid>
    )
}

export default Attendance;
