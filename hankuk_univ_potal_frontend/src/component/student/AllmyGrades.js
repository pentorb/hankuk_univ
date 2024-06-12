import Grid from '@mui/material/Grid';
import { Paper, Typography, Select, MenuItem, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../student/css/Graduation.css';
import { useAtomValue } from 'jotai';
import { memberAtom, tokenAtom } from '../../atoms';
import { url } from '../../config/config';
import axios from 'axios';


const AllmyGrades = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [lecList, setLecList] = useState([]);
    const [courYear, setCourYear] = useState(1);
    const [semester, setSemester] = useState(2);

    // const finSem = (finSem) => {
    //     const grade = Math.floor((finSem - 1) / 2 + 1);
    //     return `${grade}학년`;
    // }

    useEffect(() => {
        if (token.access_token === '') return
        sendRequest(courYear,semester);
    }, [token])

    const checkGrade = (event) => {
        const newSemester = event.target.value;
        setSemester(newSemester);

        sendRequest(courYear,newSemester);
    }

    const sendRequest = (courYear, semester) => {
        const gradeUrl = `${url}/allGrades?stdNo=${member.id}&courYear=${courYear}&semester=${semester}`;
        console.log(gradeUrl)
        axios.get(gradeUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                setLecList([...res.data.lecList]);
            });
    };



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
                                        value={courYear}
                                        onChange={(event) => setCourYear(event.target.value)}
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
                        </div>

                        <div className="miniCard">
                            <div style={{ display: 'flex', padding: '30px 0px' }}>
                                <div className="col-4 type">과목명</div>
                                <div className="col-4 type">등급</div>
                                <div className="col-4 type">구분</div>
                            </div>
                            <div style={{height:'500px', overflowY:'scroll', marginBottom:'20px'}}>
                            {lecList.map(lec => (
                                <div className="list">
                                    <div className="col-4 con">{lec.subName}</div>
                                    <div className="col-4 con">{lec.grade}</div>
                                    <div className="col-4 con">전공</div>
                                </div>
                            ))}
                            </div>    

                        </div>

                    </Grid>

                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default AllmyGrades;