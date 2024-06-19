import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms";

const LectureModify = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const { lecNo } = useParams();
    const [lecture, setLecture] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/lectureDetail/${lecNo}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setLecture(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, [token])

    const submit = () => {
        const formData = new FormData();
        formData.append("lecNo", lecture.lecNo);
        formData.append("semester", lecture.semester);
        formData.append("credit", lecture.credit);
        formData.append("sect", lecture.sect);
        formData.append("time1", lecture.time1);
        formData.append("time2", lecture.time2);
        formData.append("email", lecture.email);
        formData.append("tel", lecture.tel);
        axios.post(`${url}/lectureModify`, formData)
            .then(res => {
                console.log(res)
                navigate('/professor/lectureList');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeValue = (e) => {
        setLecture({ ...lecture, [e.target.name]: e.target.value })

    }


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의계획서</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link color="inherit" underline='none' href="/professor/lectureList">
                            강의계획
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>계획서 상세 및 수정</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <div className="Lecture_Write_body">
                    <div style={{ marginLeft: "850px" }}>
                        <Button
                            onClick={() => navigate('/professor/lectureList')}
                            className='Button_Lecture_Write'
                        >
                            목록
                        </Button>
                        <Button
                            className='Button_Lecture_Write'
                            onClick={submit}
                        >
                            수정
                        </Button>
                    </div>
                    <div className="Lecture_Write_Container">
                        <div>
                            <div className="Lecture_Write_header">강의정보</div>
                            <Form>
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="year">
                                            개설년도
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="year"
                                            name="year"
                                            type="text"
                                            disabled value={lecture.year}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="semester">
                                            개설학기
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="semester"
                                            name="semester"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.semester}
                                        >
                                            <option>
                                                학기선택
                                            </option>
                                            <option value="1학기">
                                                1학기
                                            </option>
                                            <option value="2학기">
                                                2학기
                                            </option>
                                        </Input>
                                    </FormGroup>


                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            // style={{paddingRight:'10px'}}
                                            className="Lecture_Write_Label"
                                            for="subCd">
                                            과목코드
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="subCd"
                                            name="subCd"
                                            type="text"
                                            disabled value={lecture.subCd}
                                        >

                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "100%", paddingLeft: "16px" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="subName">
                                            과목명
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="subName"
                                            name="subName"
                                            type="text"
                                            disabled value={lecture.subName}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ paddingLeft: "35px" }}
                                            className="Lecture_Write_Label"
                                            for="credit">
                                            학점
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="credit"
                                            name="credit"
                                            type="text"
                                            onChange={changeValue}
                                            value={lecture.credit}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="sect">
                                            온오프라인
                                        </Label>
                                        <Input
                                            style={{ width: "211px" }}
                                            className="Lecture_Write_Input"
                                            id="sect"
                                            name="sect"
                                            type="select"
                                            onChange={changeValue}
                                            value={lecture.sect}
                                        >
                                            <option>
                                                온라인
                                            </option>
                                            <option>
                                                오프라인
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>

                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ fontSize: "larger", marginLeft: "-12px", marginRight: "18px" }}
                                            // className="Lecture_Write_Label"
                                            for="time1">
                                            1차시시간
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="time1"
                                            name="time1"
                                            type="time"
                                            onChange={changeValue}
                                            value={lecture.time1}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="exampleEmail">
                                            2차시시간
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="time2"
                                            name="time2"
                                            type="time"
                                            onChange={changeValue}
                                            value={lecture.time1}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="Lecture_Write_header" style={{ marginTop: "50px" }}>
                                    교수정보</div><br />
                                <div style={{ width: "100%" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="profNo">
                                            교수번호
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="profNo"
                                            name="profNo"
                                            type="text"
                                            disabled value={lecture.profNo}
                                        />
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            style={{ marginLeft: "12px" }}
                                            className="Lecture_Write_Label"
                                            for="profName">
                                            교수명
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="profName"
                                            name="profName"
                                            type="text"
                                            disabled value={lecture.profName}
                                        />
                                    </FormGroup>

                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="email">
                                            이메일
                                        </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={changeValue}
                                        />
                                    </FormGroup>
                                </div>

                                <div style={{ width: "959px", height: "50px" }}
                                    className="Lecture_Write_header">강의계획서 첨부</div>

                                <FormGroup style={{ width: "959px", marginLeft: "50px" }}>
                                    <Label

                                        className="Lecture_Write_Label"
                                        for="files">
                                    </Label>
                                    <Input

                                        id="files"
                                        name="files"
                                        type="file"
                                    />
                                </FormGroup>
                            </Form>
                        </div><br />

                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default LectureModify;