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
import { tokenAtom, memberAtom,lectureNameAtom, lectureNumberAtom, selectedNumberAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const HomeworkList = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const lectureName = useAtomValue(lectureNameAtom);
    const lectureNumber = useAtomValue(lectureNumberAtom);
    const setSelectedNumber = useSetAtom(selectedNumberAtom);
    const [homeworkList, setHomeworkList] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        let formData = new FormData();
        formData.append("stdNo", member.id);

        const homeworkUrl = `${url}/homework/${lectureNumber}`;
        console.log(homeworkUrl);
        axios.post(homeworkUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setHomeworkList([...res.data.homeworkList])
            })
            .catch(err => {
                console.log(err);
                setHomeworkList(null)
            })
    }, [token])

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>과제</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
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
                            <b>과제</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                {/* ------Your content start------! */}                
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                        <TableContainer component={Paper} sx={{ marginTop: 10, marginBottom: 10 }}>
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: "white" }}>주차</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>차시</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>과제명</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>시작일시</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>마감일시</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>점수</TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>상세보기</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {homeworkList.length !== 0 && (homeworkList.map(homework => (
                                        <TableRow key={homework.number}>
                                            <TableCell align="center">{homework.week}</TableCell>
                                            <TableCell align="center">{homework.count}</TableCell>
                                            <TableCell align="center">{homework.title}</TableCell>
                                            <TableCell align="center">{homework.startDate}</TableCell>
                                            <TableCell align="center">{homework.endDate}</TableCell>
                                            <TableCell align="center">{homework.score === null ? "미채점" : homework.score}</TableCell>
                                            <TableCell align="center">
                                                {homework.submission === false &&
                                                    <Button variant="contained"
                                                    size="medium"
                                                    onClick={()=>{setSelectedNumber(homework.number); navigate(`/student/${lectureNumber}/sumbit-homework`);}}
                                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90 }}>제출</Button>
                                                }
                                                {homework.submission === true &&
                                                    <Button variant="contained"
                                                    size="medium"
                                                    onClick={()=>{setSelectedNumber(homework.number); navigate(`/student/${lectureNumber}/homework/${homework.number}`);}}
                                                    sx={{ margin: "0 auto", backgroundColor: "firstColor.main", borderRadius: 10, width:90 }}>보기</Button>
                                                }                                                
                                            </TableCell>
                                        </TableRow>
                                    )))}
                                    {homeworkList.length === 0 &&
                                        <TableRow>
                                            <TableCell align="center" colSpan={7}>과제가 없습니다</TableCell>
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

export default HomeworkList;