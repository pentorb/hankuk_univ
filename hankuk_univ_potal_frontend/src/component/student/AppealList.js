import { Typography, Paper, Button, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const AppealList = () => {
    const [semester, setSemester] = useState(1);
    const [year, setYear] = useState(1);
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [appealList, setAppealList] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        checkAppealList();
    }, [token])

    const checkAppealList = () => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("year", year);
        formData.append("semester", semester);

        const appealUrl = `${url}/appeal`;
        axios.post(appealUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                console.log(res.data)
                setAppealList([...res.data.appealList])
            })
            .catch(err => {
                console.log(err);
                setAppealList(null)
            })
    }
    
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>이의신청 내역</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link color="inherit" underline='none'>
                            성적
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>이의신청 내역</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}
                <Grid container>
                    <Grid item xs={12} sx={{ height: 50 }} />
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin: "0 auto", marginRight: 4 }} size="small">
                                <Select
                                    id="demo-select-small"
                                    value={year}
                                    onChange={(event) => setYear(event.target.value)}
                                >
                                    <MenuItem value={1}>1학년</MenuItem>
                                    <MenuItem value={2}>2학년</MenuItem>
                                    <MenuItem value={3}>3학년</MenuItem>
                                    <MenuItem value={4}>4학년</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin: "0 auto", marginRight: 4 }} size="small">
                                <Select
                                    id="demo-select-small"
                                    value={semester}
                                    onChange={(event) => setSemester(event.target.value)}
                                >
                                    <MenuItem value={1}>1학기</MenuItem>
                                    <MenuItem value={2}>2학기</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" size="medium" onClick={checkAppealList} sx={{ margin: "0 auto", backgroundColor: "firstColor.main" }}>조회</Button>
                        </div>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={12} sx={{ height: 50 }} />
                </Grid>
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <TableContainer component={Paper} sx={{ marginTop: 10, marginBottom: 10 }}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ color: "white" }}>신청날짜</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>강의명</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>교수명</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>학점</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>성적</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>상태</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>상세보기</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {appealList.length !== 0 && (appealList.map(appeal => (
                                            <TableRow key={appeal.appNo}>
                                                <TableCell align="center">{appeal.reqDt}</TableCell>
                                                <TableCell align="center">{appeal.lectureName}</TableCell>
                                                <TableCell align="center">{appeal.professorName}</TableCell>
                                                <TableCell align="center">{appeal.credit}</TableCell>
                                                <TableCell align="center">{appeal.grade}</TableCell>
                                                <TableCell align="center">{appeal.status === "NEW" ? "신규" : "완료"}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained"
                                                    size="medium"
                                                    onClick={()=>navigate(`/student/appeal-detail/${appeal.appNo}`)}
                                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90 }}>보기</Button>
                                                </TableCell>
                                            </TableRow>
                                        )))}
                                        {appealList.length === 0 &&
                                            <TableRow>
                                                <TableCell align="center" colSpan={7}>이의신청이 없습니다</TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                {/* ------Your content end------! */}
                <br/>
            </Paper>
        </Grid>
    )
}

export default AppealList;