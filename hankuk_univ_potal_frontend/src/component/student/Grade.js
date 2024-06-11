import { Typography, Paper, Button, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';


const Grade = () => {
    const [semester, setSemester] = useState();
    const [year, setYear] = useState();
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [gradeList, setGradeList] = useState([]);
    const [score, setScore] = useState({majorCredit:'', semesterCredit:'', rank:'', studentCount:'', point:'', score:''});
    
    const checkGrade = () => {
        const gradeUrl = `${url}/grade?stdNo=${member.id}&year=${year}&semester=${semester}`;
        console.log(gradeUrl);
        axios.get(gradeUrl, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setGradeList([...res.data.gradeList])
                setScore({...res.data.semesterScore})
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4}>
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 성적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>성적조회</b></Typography>
                </Typography>
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
                            <Button variant="contained" size="large" onClick={checkGrade} sx={{ margin: "0 auto", backgroundColor: "firstColor.main" }}>조회</Button>
                        </div>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={12} sx={{ height: 50 }} />
                </Grid>
                {score.semesterCredit > 0 &&
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ color: "white" }}>이수학점</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>전공학점</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>학점평균</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>석차</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">{score.semesterCredit}</TableCell>
                                            <TableCell align="center">{score.majorCredit}</TableCell>
                                            <TableCell align="center">{score.point}</TableCell>
                                            <TableCell align="center">{score.rank} / {score.studentCount}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={1} />
                        <Grid item xs={10}>
                            <TableContainer component={Paper} sx={{ marginTop: 10, marginBottom: 10 }}>
                                <Table aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "firstColor.main", color: "white" }}>
                                        <TableRow>
                                            <TableCell align="center" sx={{ color: "white" }}>강의명</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>교수명</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>성적</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>이의신청</TableCell>
                                            <TableCell align="center" sx={{ color: "white" }}>학점포기</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gradeList.map(grade => (!grade.isDrop &&
                                            <TableRow key={grade.subjectName}>
                                                <TableCell align="center">{grade.subjectName}</TableCell>
                                                <TableCell align="center">{grade.professorName}</TableCell>
                                                <TableCell align="center">{grade.grade}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}                                    
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                }
                {/* ------Your content end------! */}
                <br/>
            </Paper>
        </Grid>
    )
}

export default Grade;