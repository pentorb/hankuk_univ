import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css'
import { Grid, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import axios from "axios";
import {url} from '../../config/config';
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms";
const LectureWrite = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const [lecture, setLecture] = useState(
        {
            lecNo:'CSEM01',year:0,semester:'',subCd:'',credit:0,
            sect:'',time1:'',time2:'',profNo:''
        })
    const navigate=useNavigate();

    const changeValue = (e) => {
        setLecture({...lecture, [e.target.name]:e.target.value})
    }

    const submit = () => {
        const formData = new FormData();
        formData.append("lecNo", lecture.lecNo);
        formData.append("year", lecture.year);
        formData.append("semester", lecture.semester);
        formData.append("subCd", lecture.subCd);
        formData.append("credit", lecture.credit);
        formData.append("sect", lecture.sect);
        formData.append("time1", lecture.time1);
        formData.append("time2", lecture.time2);
        formData.append("profNo", lecture.profNo);
        axios.post(`${url}/lectureWrite`,formData, 
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res=>{
                console.log(res)
                navigate('/professor/lectureList');
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의계획서</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 마이페이지 <KeyboardDoubleArrowRightIcon /> 강의계획서 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>작성</b></Typography>
                </Typography>
                <div className="Lecture_Write_body">
                    <div style={{ marginLeft: "736px" }}>
                        <Button
                            onClick={()=>navigate('/professor/lectureList')}
                            className='Button_Lecture_Write'
                        >
                            목록
                        </Button>
                        <Button
                            className='Button_Lecture_Write'
                            onClick={submit}
                        >
                            신청
                        </Button>
                    </div>
                    <div className="Lecture_Write_Container">
                        <div>
                            <div className="Lecture_Write_header">강의정보</div>
                            <Form>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
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
                                            placeholder="개설년도(숫자만)"
                                            type="text"
                                            onChange={changeValue}
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
                                        >
                                            <option>
                                                학기선택
                                            </option>
                                            <option>
                                                1학기
                                            </option>
                                            <option>
                                                2학기
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
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
                                            onChange={changeValue}
                                        >
                                            <option>
                                                과목코드선택
                                            </option>
                                            <option>
                                                CSCS
                                            </option>
                                            <option>
                                                CSEM
                                            </option>
                                            <option>
                                                3
                                            </option>
                                            <option>
                                                4
                                            </option>
                                            <option>
                                                5
                                            </option>
                                        </Input>
                                    </FormGroup>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FormGroup className="Lecture_Write_FormGroup right">
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
                                        >
                                            <option>
                                                과목선택
                                            </option>
                                            <option>
                                                컴퓨터과학
                                            </option>
                                            <option>
                                                공업수학
                                            </option>
                                            <option>
                                                게이밍이론
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="credit">
                                            학점
                                        </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="credit"
                                            name="credit"
                                            placeholder="학점(숫자만)"
                                            type="text"
                                            onChange={changeValue}
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
                                        >
                                            <option>
                                                온/오프라인선택
                                            </option>
                                            <option>
                                                온라인
                                            </option>
                                            <option>
                                                오프라인
                                            </option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
                                    <FormGroup className="Lecture_Write_FormGroup left">
                                        <Label
                                            style={{ fontSize: "24px", marginRight: "4px" }}
                                            // className="Lecture_Write_Label"
                                            for="time1">
                                            1차시시간&nbsp;
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="time1"
                                            name="time1"
                                            type="time"
                                            onChange={changeValue}
                                        />
                                    </FormGroup>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FormGroup className="Lecture_Write_FormGroup right">
                                        <Label
                                            className="Lecture_Write_Label"
                                            for="time2">
                                            2차시시간
                                        </Label>
                                        <Input
                                            className="Lecture_Write_Input"
                                            id="time2"
                                            name="time2"
                                            type="time"
                                            onChange={changeValue}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="Lecture_Write_header">교수정보</div>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
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
                                            onChange={changeValue}
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
                                            placeholder=""
                                            type="text"
                                        />
                                    </FormGroup>
                                </div>
                                <div style={{ width: "959px", height: "87px", margin: "20px 0 20px 0" }}>
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
                                            placeholder="이메일"
                                            type="email"
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
                                            placeholder=""
                                            type="tel"
                                        />
                                    </FormGroup>
                                </div>
                                <div style={{ width: "959px", height: "50px" }}
                                    className="Lecture_Write_header">강의계획서 첨부</div>
                                
                                <FormGroup style={{ width: "959px"}}>
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
export default LectureWrite;