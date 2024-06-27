import { Breadcrumbs, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Label } from "reactstrap";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
import './css/proff.css';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { initLecture, lectureAtom, memberAtom, tokenAtom } from "../../atoms";

const LectureDashboard = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const setLectureAtom = useSetAtom(lectureAtom);
    const [member, setMember] = useAtom(memberAtom);

    // private String lecNo;
    // private Integer credit;
    // private String sect;
    // private String time1;
    // private String time2;
    // private Integer numOfStd;
    // private String files;
    // private String lecRoom;
    // private String status;
    // private Boolean isScoreChk;
    // private Integer year;
    // private String semester;
    // private String subCd;
    // private String profNo;
    // private String profName;
    // private String email;
    // private String tel;
    // private String subName;
    const [lecture, setLecture] = useState({
        lecNo: '', credit: 0, sect: '', time1: '', time2: '',
        numOfStd: 0, files: '', lecRoom: '', status: '', isScoreChk: null, year: 0, semester: '',
        subCd: '', profNo: '', profName: '', email: '', tel: '', subName: ''
    });
    const [lectureList, setLectureList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const semester = month < 7 ? 1 : 2;
        console.log(year);
        axios.get(`${url}/lectureDashboard?profNo=${member.id}&year=${year}&semester=${semester}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setLectureList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }, [token])

    const contents = (index) => {
        const selectedLecture = lectureList[index];
        setLectureAtom({ ...selectedLecture });
        console.log(selectedLecture);
        navigate(`/professor/contents`)
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>나의 강의</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>강의 대시보드</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <Grid >
                    <div style={{padding:'0px 100px', marginLeft:'80px'}}>
                        {lectureList !== null && lectureList.map((lecture, i) => (
                            <Card key={i} style={{ width: '300px', margin:'20px', textAlign:'left' }} className="lecture-card"
                                onClick={() => contents(i)}
                            >
                                <Label className="lecture-color-card" style={{height:'130px'}} />
                                <CardBody style={{ margin: '0px 10px 10px' }}>                                        
                                    <CardTitle  style={{ fontSize: 'larger' }}>
                                        <b>{lecture.subName}</b>
                                    </CardTitle>
                                    <CardText  style={{ margin: '0px' }}>
                                        {lecture.year}년 {lecture.semester}학기<br/>
                                        {lecture.time1}, {lecture.lecRoom}
                                    </CardText>
                                    
                                </CardBody>
                            </Card>
                        ))}

                    </div>

                </Grid>
            </Paper>
        </Grid>
    )
}
export default LectureDashboard;