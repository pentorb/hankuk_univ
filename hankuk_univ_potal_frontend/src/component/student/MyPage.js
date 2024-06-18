import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Paper, Typography, Grid, Breadcrumbs, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Input, Table } from 'reactstrap';
import PersonIcon from '@mui/icons-material/Person';
import '../student/css/Mypage.css';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

const MyPage = () => {
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>마이페이지</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>상세 보기</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div style={{ display: 'flex', marginTop: '20px' }}>

                            <div className='col-4'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">학번</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">전화번호</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">생년월일</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">학과</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">이수학점</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">우편번호</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">주소</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>

                            </div>

                            <div className='col-4' style={{ marginLeft: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">이름</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">이메일</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">학년</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">지도교수</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-3 ttext">이수학기</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '49px' }}>
                                    <div className="col-3 ttext">상세주소</div>
                                    <Input type="text" id="stdNo" name="stdNo" className='infoD' />
                                </div>

                            </div>

                            <div className='col-4 personBG'>
                                <PersonIcon className='personIcon' style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>

                        <div style={{margin:'30px 0px'}}>
                            <div className="categori">
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>비밀번호 변경</b></span>
                            </div>
                            <div style={{padding:'22px 50px', fontSize:'larger'}}>
                                비밀번호를 변경하시려면 <b style={{color:'blue', textDecoration:'underline'}}>여기</b>를 클릭하시오
                            </div>
                        </div>

                        <div style={{margin:'30px 0px'}}>
                            <div className="categori">
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>학적 변동사항</b></span>
                            </div>
                            <div style={{ padding: '10px 50px 30px', textAlign: 'center', fontSize: 'larger' }}>
                                <Table className="table" bordered>
                                    <thead>
                                        <tr>
                                            <th>일시</th>
                                            <th>학부(과)</th>
                                            <th>학번</th>
                                            <th>학년</th>
                                            <th>변동사항</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">2020.03.01</td>
                                            <td>컴퓨터공학과</td>
                                            <td>241001</td>
                                            <td>1학년</td>
                                            <td>입학</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default MyPage;