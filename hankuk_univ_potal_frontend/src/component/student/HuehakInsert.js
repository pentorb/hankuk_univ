import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HuehakInfo from '../student/HuehakInfo';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input, Button } from 'reactstrap';
import '../student/css/HueAndBok.css';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAtom, useAtomValue } from 'jotai/react';
import { url } from '../../config/config';
import { tokenAtom, memberAtom } from '../../atoms';
import React from 'react';

const HuehakInsert = () => {
    const navigate = useNavigate();
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);

    // console.log(member);
    const text = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        fontSize: "larger",
        textAlign: "left"
    }

    const statusMap = {
        S1: '재학',
        S2: '휴학',
        S3: '자퇴',
        S99: '퇴학'
    };

    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "휴학 신청을 완료하시겠습니까?",
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
        stdNo: member.id,
        type: '',
        year: '',
        sem: '',
        files: '',
        reason: ''
    });

    const dataChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const submit = (e) => {
        const formData = new FormData();
        // formData.append("name", formValues.name);
        formData.append("stdNo", member.id);
        formData.append("type", formValues.type);
        formData.append("hueSem", formValues.year + formValues.sem);
        formData.append("files", formValues.files);
        formData.append("reason", formValues.reason);

        axios.post(`${url}/hueInsert`, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                console.log(res.data);
                navigate('/student/resSemester')
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 이수 학기로 학년 구하기 
    const finSem = (finSem) => {
        const grade = Math.floor((finSem-1) / 2 + 1);
        return `${grade}학년`;
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>휴학 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>휴학 신청</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 시 유의 사항</b></span>
                        </div>
                        <div className='box' style={{ overflowY: 'scroll', height:'300px' }}>
                            <div>
                                <HuehakInfo/>
                            </div>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>학적기초정보</b></span>
                        </div>
                        <div style={{ padding: '10px 50px 30px', textAlign: 'center', fontSize: 'larger' }}>
                            <Table className="table" bordered>
                                <thead>
                                    <tr>
                                        <th>학번</th>
                                        <th>이름</th>
                                        <th>학부(과)</th>
                                        <th>학년</th>
                                        <th>학적 상태</th>
                                        <th>학생 연락처</th>
                                        <th>지도교수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">{member.id}</td>
                                        <td>{member.name}</td>
                                        <td>{member.majName}</td>
                                        <td>{finSem(member.finSem)}</td>
                                        <td>{statusMap[member.status] || member.status}</td>
                                        <td>{member.tel}</td>
                                        <td>{member.profName}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>신청정보입력</b></span>
                        </div>
                        <form onSubmit={submit}>
                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">이름</div>
                                    <div className="col-6">
                                        <Input type="text" id="name" name="name"
                                            placeholder={member.name}
                                            disabled
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">학번</div>
                                    <div className="col-6">
                                        <Input type="text" id="stdNo" name="stdNo"
                                            placeholder={member.id}
                                            disabled
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">유형</div>
                                    <div className="col-6">
                                        <Input type="select" id="type" name="type"
                                            onChange={dataChange}>
                                            <option>---선택하세요---</option>
                                            <option value="o">일반 휴학</option>
                                            {member.gender !== 'F' ?
                                                (<>
                                                    <option value="m">군 휴학</option>
                                                </>
                                                ) : (<></>)
                                            }
                                            <option value="p">출산, 임신 휴학</option>
                                            <option value="s">창업 휴학</option>
                                            <option value="i">질병 휴학</option>
                                            <option value="k">육아 휴학</option>
                                        </Input>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', padding: '10px' }}>
                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">휴학년도</div>
                                    <div className="col-6">
                                        <Input type="text" id="year" name="year"
                                            placeholder='2024' 
                                            onChange={dataChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">휴학학기</div>
                                    <div className="col-6">
                                        <Input type="select" id="sem" name="sem"
                                            onChange={dataChange}>
                                            <option>학기 선택</option>
                                            <option value="01">1학기</option>
                                            <option value="02">2학기</option>
                                        </Input>
                                    </div>
                                </div>


                                <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-4">첨부자료</div>
                                    <div className="col-6">
                                        <Input type="file" id="files" name="files"
                                            style={{ width: '100%' }}
                                            onChange={dataChange}
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
                                        onChange={dataChange} />
                                </div>
                            </div>

                            <div className="col-12" style={{ padding: '10px 30px 0px', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button style={{ backgroundColor: '#1F3468' }} onClick={alert}>휴학 신청</Button>
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