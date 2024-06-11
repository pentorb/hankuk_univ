import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Input } from 'reactstrap';
import '../student/css/Graduation.css';


const AllmyGrades = () => {
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>전체학기 성적 조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
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
                        <div style={{display:'flex', paddingTop:'20px'}}>
                            <div className="col-4" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                                <span className="selText">연도</span>
                                <Input type="text" className="selBox" style={{textAlign:'right'}}/>
                            </div>
                            <div className="col-4" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                                <span className="selText">학기</span>
                                <Input type="select" className="selBox">
                                    <option>학기</option>
                                    <option value="REQ">신청</option>
                                    <option value="REJ">반려</option>
                                    <option value="APP">완료</option>
                                </Input>
                            </div>
                            <div className="col-4" style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                                <span className="selText">구분</span>
                                <Input type="select" className="selBox">
                                    <option>처리 현황</option>
                                    <option value="REQ">신청</option>
                                    <option value="REJ">반려</option>
                                    <option value="APP">완료</option>
                                </Input>
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