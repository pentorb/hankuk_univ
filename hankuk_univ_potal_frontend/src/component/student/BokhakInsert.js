import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Table, Input, Button } from 'reactstrap';
import '../student/css/Bokhak.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';
import React from 'react';

const HuehakInsert = () => {
    const navigate = useNavigate();


    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "복학 신청을 완료하시겠습니까?",
            text: "한 번 제출된 휴학신청은 철회할 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "확인"
        }).then((result) => {
            if (result.isConfirmed) {
                submit(e);
            }
        });
    }

    const [formValues, setFormValues] = React.useState({
        // name: '',
        // stdNo: '',
        // type: '',
        // year: '',
        // sem: '',
        // files: '',
        // reason: ''
    });

    const dataChange = (e) => {
        // const { name, value } = e.target;
        // setFormValues({ ...formValues, [name]: value });
    }


    const submit = (e) => {
        // const formData = new FormData();
        // formData.append("name", formValues.name);
        // formData.append("stdNo", formValues.stdNo);
        // formData.append("type", formValues.type);
        // formData.append("hueSem", formValues.year + formValues.sem);
        // formData.append("files", formValues.files);
        // formData.append("reason", formValues.reason);

        // axios.post('http://localhost:8090/hueInsert', formData)
        //     .then(res => {
        //         console.log(res.data);
        //         navigate('/my-potal/regHuehak')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>복학 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "110vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 학적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>복학 신청
                    </b></Typography>
                </Typography>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 안내</b></span>
                        </div>
                        <div className='box'>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="t"><ArrowDropDownRoundedIcon /> 복학은 복학 신청기간 내에만 가능합니다.</div>
                                <div className="t"><ArrowDropDownRoundedIcon /> 수강신청 관련은 각 학과 조교에게 문의 바랍니다.</div>
                                <div className="t"><ArrowDropDownRoundedIcon /> 수강신청 정정 또는 기간 내 수강신청을 못했을 경우 개강  후 정정기간을 이용하여 수정하십시오.</div>
                                <div className="t"><ArrowDropDownRoundedIcon /> 복학신청이 완료되면 수강신청 및 등록사항을 반드시 확인하십시오.</div>
                                <div className="t"><ArrowDropDownRoundedIcon /> <span style={{ color: 'red' }}>복학접수 후 등록금을 납부하지 않고 휴학한 학생은 등록금 고지서를 출력하여 등록기간 내에 등록금을 납부하시오. </span></div>
                            </div>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>복학 신청 등록</b></span>
                        </div>
                        <form onSubmit={submit}>
                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 구분</div>
                                    <div className="col-6">
                                        <Input type="select" id="type" name="type"
                                            onChange={dataChange}>
                                            <option>---선택하세요---</option>
                                            <option value="o">일반 휴학</option>
                                            <option value="m">군 휴학</option>
                                            <option value="p">출산, 임신 휴학</option>
                                            <option value="s">창업 휴학</option>
                                            <option value="i">질병 휴학</option>
                                        </Input>
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">신청 일자</div>
                                    <div className="col-6">
                                        <Input
                                            id="exampleDate"
                                            name="date"
                                            placeholder="date placeholder"
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">휴학 번호</div>
                                    <div className="col-6">
                                        <Input type="select" id="type" name="type"
                                            onChange={dataChange}>
                                            <option>---선택하세요---</option>
                                            <option value="o">일반 휴학</option>
                                            <option value="m">군 휴학</option>
                                            <option value="p">출산, 임신 휴학</option>
                                            <option value="s">창업 휴학</option>
                                            <option value="i">질병 휴학</option>
                                        </Input>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 년도</div>
                                    <div className="col-6">
                                        <Input type="text" id="year" name="year"
                                            placeholder='2024'
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 학년</div>
                                    <div className="col-6">
                                        <Input type="select" id="sem" name="sem"
                                            onChange={dataChange}>
                                            <option>학년 선택</option>
                                            <option value="01">1학년</option>
                                            <option value="02">2학년</option>
                                            <option value="02">3학년</option>
                                            <option value="02">4학년</option>
                                        </Input>
                                    </div>
                                </div>


                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="col-4 title">복학 학기</div>
                                    <div className="col-6">
                                        <Input type="select" id="sem" name="sem"
                                            onChange={dataChange}>
                                            <option>학기 선택</option>
                                            <option value="01">1학기</option>
                                            <option value="02">2학기</option>
                                        </Input>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12" style={{ padding: '50px 30px 0px', display: 'flex', justifyContent: 'center' }}>
                                <Button style={{ backgroundColor: '#1F3468' }} onClick={alert}>복학 신청</Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default HuehakInsert;