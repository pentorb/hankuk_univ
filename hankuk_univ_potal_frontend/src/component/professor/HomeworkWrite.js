import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms";
const HomeworkWrite = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const { lecNo, week } = useParams();
    const [homework, setHomework] = useState({
        title:'',week:week,startDt:'',endDt:'',content:'',lecNo:lecNo,lessonCnt:0
    });

    const navigate=useNavigate();

    const changeValue = (e) => {
        setHomework({...homework, [e.target.name]:e.target.value})
    }
    const submit = () => {
        console.log(homework);
        axios.post(`${url}/homeworkWrite`,{homework:homework},
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res=>{
                console.log(res)
                navigate(`/professor/contents/${lecNo}`)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>과제등록</b>
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 과목  <KeyboardDoubleArrowRightIcon /> 강의콘텐츠  <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>과제등록</b></Typography>
                </Typography>
                <div className="Homework_body">
                    <div className="Homework_Form">
                        <Form>
                            <FormGroup>
                                <Label
                                    style={{ marginRight: "23px" }}
                                    className="Homework_Write_Label"
                                    for="title"
                                >
                                    제목
                                </Label>
                                <Input
                                    style={{ width: '789px' }}
                                    className="Homework_Write_Input"
                                    id="title"
                                    name="title"
                                    placeholder=""
                                    type="text"
                                    onChange={changeValue}
                                />
                            </FormGroup>
                            <div style={{ width: '860px' }}>
                                <FormGroup className="Homework_FormGrop " style={{ marginRight: '16px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="week"
                                    >
                                        주차
                                    </Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="week"
                                        name="week"
                                        disabled value={week}
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop">
                                    <Label

                                        className="Homework_Write_Label"
                                        for="lessonCnt"
                                    >
                                        차시
                                    </Label>&nbsp;&nbsp;&nbsp;
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="lessonCnt"
                                        name="lessonCnt"
                                        placeholder=""
                                        type="text"
                                        onChange={changeValue}
                                    />
                                </FormGroup>
                            </div>
                            <div style={{ width: "860px" }}>
                                <FormGroup className="Homework_FormGrop " style={{ marginRight: '13px' }}>
                                    <Label

                                        className="Homework_Write_Label"
                                        for="startDt"
                                    >
                                        시작&nbsp;&nbsp;&nbsp;
                                    </Label>
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="startDt"
                                        name="startDt"
                                        placeholder=""
                                        type="date"
                                        onChange={changeValue}
                                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop ">
                                    <Label

                                        className="Homework_Write_Label"
                                        for="endDt"
                                    >
                                        마감&nbsp;&nbsp;&nbsp;
                                    </Label>
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="endDt"
                                        name="endDt"
                                        placeholder=""
                                        type="date"
                                        onChange={changeValue}
                                    />
                                </FormGroup>
                            </div>
                            <FormGroup className="Homework_FormGrop ">
                                <Label

                                    className="Homework_Write_Label"
                                    for="content"
                                >
                                    내용
                                </Label>
                                <Input
                                    style={{
                                        width: '860px', height: '200px',
                                        resize: 'none', padding: "30px 30px"
                                    }}
                                    className="Homework_Write_Input"
                                    id="content"
                                    name="content"
                                    placeholder=""
                                    type="textarea"
                                    onChange={changeValue}
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            className='Button_Homework_Write'
                            onClick={submit}
                        >
                            등록
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default HomeworkWrite;