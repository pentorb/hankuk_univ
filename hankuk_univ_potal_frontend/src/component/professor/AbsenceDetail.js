import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { useLocation, useNavigate } from "react-router";
import { Button, Input } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import Swal from "sweetalert2";

const AbsenceDetail = () => {
    const text = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        fontSize: "larger",
        textAlign: "left"
    }
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const navigate = useNavigate();
    const location = useLocation();
    const abs = location.state?.abs;
    const [absence, setAbsence] = useState(abs);

    const changeValue = (e) => {
        setAbsence({ ...absence, [e.target.name]: e.target.value });
    }

    const confirm = () => {

        axios.post(`${url}/absenceConfirm`, { absence: absence },
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                Swal.fire({
                    title: res.data,
                    // text: "That thing is still around?",
                    icon: "success"
                });
                navigate("/professor/absenceList")

            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>공결신청목록</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none' href="/professor/lectureDashboard">
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lecture.subName}
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>공결신청목록</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="AppealDetail_Body">
                    <div style={{ display: 'flex', padding: '10px' }}>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">이름</div>
                            <div className="col-6">
                                <Input type="text" id="name" name="name"
                                    disabled value={absence.stdName}
                                />
                            </div>
                        </div>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">학번</div>
                            <div className="col-6">
                                <Input type="text" id="stdNo" name="stdNo"
                                    disabled value={absence.stdNo}
                                />
                            </div>
                        </div>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">강의명</div>
                            <div className="col-6">
                                <Input type="text" id="type" name="type"
                                    disabled value={lecture.subName}>
                                </Input>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', padding: '10px' }}>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">주차</div>
                            <div className="col-6">
                                <Input type="text" id="week" name="week"
                                    disabled value={absence.week}
                                />
                            </div>
                        </div>

                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">사유</div>
                            <div className="col-6">
                                <Input type="text" id="week" name="week"
                                    disabled value={absence.type==='01' ? '일반' : absence.type==='02' ? '병결' : absence.type==='44' ? '여학생공결' : absence.type==='21' ? '예비군' : ''}
                                />
                            </div>
                        </div>

                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">상태</div>
                            <div className="col-6">
                                <Input
                                    type="select"
                                    id="status"
                                    name="status"
                                    value={absence.status}
                                    onChange={(e) => changeValue(e)}>
                                    <option value="NEW">신규</option>
                                    <option value="END">완료</option>
                                </Input>
                            </div>
                        </div>
                    </div>

                    {/* <div style={{ display: 'flex', padding: '10px' }}>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-4">첨부자료</div>
                            <div className="col-6">
                                <Input type="file" id="files" name="files"
                                    style={{ width: '100%' }}

                                />
                            </div>
                        </div>
                    </div> */}
                    <div style={{ padding: '10px' }}>
                        <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={text} className="col-3">이의내용</div>
                        </div>
                        <div style={{ padding: '5px 0px 0px 15px' }}>
                            <Input type="textarea" id="reason" name="reason"
                                style={{ padding: '20px', width: '98%', height: '250px', resize: 'none' }}
                                disabled value={absence.content}
                            />
                        </div>
                        

                    </div>

                    <div className="col-12" style={{ padding: '10px 30px 0px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button style={{ backgroundColor: '#1F3468', marginRight: '10px' }} onClick={() => navigate(`/professor/absenceList`)} >목록</Button>
                        <Button style={{ backgroundColor: '#1F3468' }} onClick={confirm}>답변</Button>
                    </div>
                </div>

                </Paper>
        </Grid>
    )
}
export default AbsenceDetail;