import Grid from '@mui/material/Grid';
import { Typography, Paper, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import SelectYearAndSemester from './SelectYearAndSemester';
import { useState } from 'react';

const Grade = () => {
    const [semester, setSemester] = useState();
    const [year, setYear] = useState();
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4}>
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 성적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>성적조회</b></Typography>
                </Typography>
                {/* ------Your content start------! */}
                <SelectYearAndSemester semester={semester} setSemester={setSemester} year={year} setYear={setYear} />
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
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">60 / 100</TableCell>
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
                                    <TableRow>
                                        <TableCell align="center">경영학개론</TableCell>
                                        <TableCell align="center">홍길동</TableCell>
                                        <TableCell align="center">A+</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">21</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">3.51</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>이의신청</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "secondColor.main", borderRadius: 3 }}>학점포기</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                {/* ------Your content end------! */}
            </Paper>
        </Grid>
    )
}

export default Grade;