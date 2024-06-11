import Grid from '@mui/material/Grid';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Input } from 'reactstrap';
import '../student/css/Graduation.css';
import { useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';
import { url } from '../../config/config';
import axios from 'axios';


const AllmyGrades = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [grades, setGrades] = useState([]);
    const [semester, setSemester] = useState(2);
    const [gradeList, setGradeList] = useState([]);
    const [year, setYear] = useState(1);

    // const finSem = (finSem) => {
    //     const grade = Math.floor((finSem - 1) / 2 + 1);
    //     return `${grade}학년`;
    // }

    useEffect(() => {
        if (token.access_token === '') return

        console.log(member);
        sendRequest(year,semester);
    }, [token])

    const sendRequest = (year, semester) => {
        axios.get(`${url}/allGrades?stdNo=${member.id}&year=${year}&semester=${semester}`, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                setGradeList([...res.data.gradeList]);
            });
    };

    const checkGrade = (event) => {
        const newSemester = event.target.value;
        setSemester(newSemester);

        sendRequest(year,semester);
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>전체학기 성적 조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            졸업
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>전체학기 성적 조회</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0px 20px 15px' }}>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <FormControl sx={{ m: 1, minWidth: 150, float: "left", margin: "0 auto", marginRight: 4}} size="small">
                                    <Select id="demo-select-small"
                                        value={year}
                                        onChange={(event) => setYear(event.target.value)}
                                    >
                                        <MenuItem value={1}>1학년</MenuItem>
                                        <MenuItem value={2}>2학년</MenuItem>
                                        <MenuItem value={3}>3학년</MenuItem>
                                        <MenuItem value={4}>4학년</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <FormControl sx={{ m: 1, minWidth: 150, float: "left", margin: "0 auto", marginRight: 4}} size="small">
                                    <Select
                                        id="demo-select-small"
                                        value={semester}
                                        onChange={checkGrade}
                                    >
                                        <MenuItem value={1}>1학기</MenuItem>
                                        <MenuItem value={2}>2학기</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {/* <div className="col-3" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                                <span className="selText">구분</span>
                                <Input type="select" className="selBox" style={{textAlign:'right'}}>
                                    <option value="">전공</option>
                                    <option value="APP">교양</option>
                                </Input>
                            </div> */}
                            {/* <div className="col-4" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                                <Button variant="contained" size="medium" sx={{ margin: "0 auto", backgroundColor: "#1f3468" }}>조회</Button>
                            </div> */}
                        </div>

                        <div className="miniCard">
                            <div style={{ display: 'flex', padding: '30px 0px' }}>
                                <div className="col-4 type">과목명</div>
                                <div className="col-4 type">등급</div>
                                <div className="col-4 type">구분</div>
                            </div>
                            {gradeList.map(grade => (
                                <div className="list">
                                    <div className="col-4 con">{grade.subjectName}</div>
                                    <div className="col-4 con">{grade.grade}</div>
                                    <div className="col-4 con">전공</div>
                                </div>
                            ))}


                            {/* <div className="list">
                                <div className="col-4 con">게임프로그래밍실습</div>
                                <div className="col-4 con">A+</div>
                                <div className="col-4 con">전공</div>
                            </div>
                            <div className="list">
                                <div className="col-4 con">게임프로그래밍실습</div>
                                <div className="col-4 con">A+</div>
                                <div className="col-4 con">전공</div>
                            </div> */}
                        </div>

                    </Grid>

                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AllmyGrades;