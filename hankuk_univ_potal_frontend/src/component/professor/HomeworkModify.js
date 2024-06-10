import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './prof.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import { useNavigate, useParams } from "react-router";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms";

const HomeworkModify = () => {
    const [token, setToken] = useAtom(tokenAtom);

    const {hwNo} = useParams();
    // private Integer hwNo;
	// private Date regDt;
	// private Date startDt;
	// private Date endDt;
	// private String title;
	// private String content;
	// private String files;
	// private String lecNo;
	// private Integer lessonNo;
	// private Integer week;
	// private Integer lessonCnt;
    const [homework, setHomework] = useState({
        hwNo:hwNo,title:'',week:0,startDt:'',endDt:'',content:'',lecNo:'',lessonCnt:0
    });
    const navigate=useNavigate();

    useEffect(() => {
        axios.get(`${url}/homeworkDetail/${hwNo}`,
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res => {
                console.log(res);
                setHomework(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    const submit = () => {
        axios.post(`${url}/homeworkModify`,{homework:homework},
        {
            headers: { Authorization: JSON.stringify(token) }
        }
        )
            .then(res=>{
                console.log(res)
                navigate(`/professor/contents/${homework.lecNo}`);
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const changeValue = (e) => {
        setHomework({...homework, [e.target.name]:e.target.value})
    }

    console.log(homework)
    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>과제상세 및 수정</b>
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 과목  <KeyboardDoubleArrowRightIcon /> 강의콘텐츠  <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>과제상세 및 수정</b></Typography>
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
                                    value={homework.title}
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
                                    </Label>
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="week"
                                        name="week"
                                        placeholder=""
                                        type="text"
                                        disabled value={homework.week}
                                    />
                                </FormGroup>
                                <FormGroup className="Homework_FormGrop">
                                    <Label

                                        className="Homework_Write_Label"
                                        for="lessonCnt"
                                    >
                                        차시
                                    </Label>
                                    <Input
                                        style={{ width: '350px' }}
                                        className="Homework_Write_Input"
                                        id="lessonCnt"
                                        name="lessonCnt"
                                        placeholder=""
                                        type="text"
                                        disabled value={homework.lessonCnt}
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
                                        value={homework.startDt}
                                        onChange={changeValue}
                                    />
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
                                        value={homework.endDt}
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
                                    value={homework.content}
                                    onChange={changeValue}
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            className='Button_Homework_Write'
                            onClick={submit}
                        >
                            수정
                        </Button>
                        <Button
                            className='Button_Homework_Write'
                            onClick={()=>navigate(`/professor/contents/${homework.lecNo}`)}
                        >
                            목록
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
export default HomeworkModify;