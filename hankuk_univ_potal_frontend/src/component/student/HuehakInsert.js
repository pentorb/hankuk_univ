import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input, Button } from 'reactstrap';
import '../student/css/Huehak.css';
import Swal from "sweetalert2";

const HuehakInsert = () => {

    const text = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        fontSize: "larger",
        textAlign: "left"
    }

    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "휴학 신청을 완료하시겠습니까?",
            text: "한 번 제출된 휴학신청은 철회할 수 없습니다.",
            icon:'warning',
            showCancelButton: false,
            confirmButtonText: "확인",
        })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>휴학 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "110vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 학적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>휴학 신청
                    </b></Typography>
                </Typography>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>학적기초정보</b></span>
                        </div>
                        <div style={{ padding: '10px 10px 50px', textAlign: 'center', fontSize: 'larger' }}>
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
                            <span style={{ fontSize: 'x-large' }}><b>신청정보입력</b></span>
                        </div>

                        <div style={{ display: 'flex', padding: '10px' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-3">이름</div>
                                <div className="col-6">
                                    <Input type="text" id="name" name="name"
                                        placeholder='이름'
                                    //    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-3">학번</div>
                                <div className="col-6">
                                    <Input type="text" id="stdNo" name="stdNo"
                                        placeholder='학번'
                                    //    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">휴학신청학기</div>
                                <div className="col-6">
                                    <Input type="text" id="stdNo" name="stdNo"
                                        placeholder='2024년 2학기'
                                    //    onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', padding: '10px' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-3">유형</div>
                                <div className="col-6">
                                    <Input type="select" id="type" name="type"
                                    //    onChange={handleInputChange}
                                    >
                                        <option>---선택하세요---</option>
                                        <option value="o">일반 휴학</option>
                                        <option value="m">군 휴학</option>
                                        <option value="p">출산, 임신 휴학</option>
                                        <option value="s">창업 휴학</option>
                                        <option value="i">질병 휴학</option>
                                    </Input>
                                </div>
                            </div>
                            {/* <div className="col-2"></div> */}

                            <div className="col-8" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">첨부자료</div>
                                <div className="col-7">
                                    <Input
                                        id="exampleFile"
                                        name="file"
                                        type="file"
                                        style={{width:'100%'}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '10px' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-3">휴학 사유</div>
                            </div>
                            <div style={{ padding: '5px 0px 0px 15px' }}>
                                <Input type="textarea" id="reason" name="reason"
                                    placeholder='휴학 사유를 상세히 입력해주세요.'
                                    style={{ width: '98%', height: '250px' }}
                                ></Input>
                            </div>
                        </div>

                        <div className="col-12" style={{padding:'10px 30px 0px', display:'flex', justifyContent:'flex-end'}}>
                            <Button style={{backgroundColor:'#1F3468'}} onClick={alert}>휴학 신청</Button>
                        </div>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default HuehakInsert;