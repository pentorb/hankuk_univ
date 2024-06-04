import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./config";

const LectureModify = () => {
    const { lecNo } = useParams();
    const [lecture, setLecture] = useState({});

    useEffect(() => {
        axios.get(`${url}/lectureDetail/${lecNo}`)
            .then(res => {
                console.log(res);
                setLecture({ ...res.data})
                console.log(lecture);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    const changeValue = (e) => {
        setLecture({...lecture, [e.target.name]:e.target.value})
    }


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>성적조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 성적 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>성적조회</b></Typography>
                </Typography>
                <div className="Lecture_Write_body">
                    <div style={{ marginLeft: "690px" }}>
                        <Button
                            className='Button_Lecture_Write'
                        >
                            목록
                        </Button>
                        <Button
                            className='Button_Lecture_Write'
                        >
                            신청
                        </Button>
                    </div>
                    <div>
                        <div>
                            <div className="Lecture_Write_header">강의정보</div>
                            <Form>
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                </div>
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
                                    
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="subCd">
                                            과목코드
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="subCd"
                                            name="subCd"
                                            type="select"
                                            disabled value={lecture.lecNo}
                                        >
                                            
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="subName">
                                            과목명
                                        </Label>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="subName"
                                            name="subName"
                                            type="select"
                                            disabled value={lecture.lecName}
                                        >
                                            
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="credit">
                                            학점
                                        </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ fontSize: "24px", marginRight: "4px" }}
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                <div className="Lecture_Write_header">교수정보</div>
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
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
                                </div>
                                <div style={{ width: "970px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="email">
                                            이메일
                                        </Label>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={changeValue}
                                            value={lecture.email}
                                        />
                                    </FormGroup>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="tel">
                                            휴대전화
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="tel"
                                            name="tel"
                                            type="tel"
                                            onChange={changeValue}
                                            value={lecture.tel}
                                        />
                                    </FormGroup>
                                </div>
                                <div style={{ width: "970px", height: "50px" }}
                                    className="Lecture_Write_header">강의계획서 첨부</div>

                                <FormGroup >
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
                        </div>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default LectureModify;