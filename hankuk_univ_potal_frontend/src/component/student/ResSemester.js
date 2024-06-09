import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Table, Input, Button } from 'reactstrap';
import '../student/css/HueAndBok.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';
import React from 'react';

const ResSemester = () => {


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>잔여학기 조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "110vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 학적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>잔여학기 조회
                    </b></Typography>
                </Typography>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>사용 가능 잔여학기 수</b></span>
                        </div>
                        <div className='box'>
                            <div style={{ display: 'flex' }}>
                                <div className="col-6">
                                    <div className="sem"><p className="semCg">- 일반 휴학</p><div>8</div></div>
                                    <div className="sem"><p className="semCg">- 임신 출산 휴학</p><div>8</div></div>
                                    <div className="sem"><p className="semCg">- 질병 휴학</p><div>8</div></div>
                                </div>
                                <div className="col-6">
                                    <div className="sem"><p className="semCg">- 군 휴학</p><div>8</div></div>
                                    <div className="sem"><p className="semCg">- 육아 휴학</p><div>8</div></div>
                                    <div className="sem"><p className="semCg">- 창업 휴학</p><div>8</div></div>
                                </div>
                            </div>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 신청 현황</b></span>
                        </div>
                        <div style={{ padding: '10px 10px 50px', textAlign: 'center', fontSize: 'larger' }}>
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <Input type="select" className="selBox">
                                    <option>구분</option>
                                    <option>구분</option>
                                    <option>구분</option>
                                </Input>&nbsp;&nbsp;&nbsp;
                                <Input type="select" className="selBox">
                                    <option>상태</option>
                                    <option>신청</option>
                                    <option>완료</option>
                                </Input>
                            </div>
                            <Table className="table" bordered>
                                <thead>
                                    <tr>
                                        <th>학부(과)</th>
                                        <th>학년</th>
                                        <th>학적 상태</th>
                                        <th>지도교수</th>
                                        <th>학생 연락처</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">컴퓨터공학과</td>
                                        <td>3</td>
                                        <td>재학</td>
                                        <td>정재형</td>
                                        <td>010-5984-5968</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 신청 현황</b></span>
                        </div>
                        <div style={{ padding: '10px 10px 50px', textAlign: 'center', fontSize: 'larger' }}>
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <Input type="select" className="selBox">
                                    <option>구분</option>
                                    <option>구분</option>
                                    <option>구분</option>
                                </Input>&nbsp;&nbsp;&nbsp;
                                <Input type="select" className="selBox">
                                    <option>상태</option>
                                    <option>신청</option>
                                    <option>완료</option>
                                </Input>
                            </div>
                            <Table className="table" bordered>
                                <thead>
                                    <tr>
                                        <th>학부(과)</th>
                                        <th>학년</th>
                                        <th>학적 상태</th>
                                        <th>지도교수</th>
                                        <th>학생 연락처</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">컴퓨터공학과</td>
                                        <td>3</td>
                                        <td>재학</td>
                                        <td>정재형</td>
                                        <td>010-5984-5968</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ResSemester;