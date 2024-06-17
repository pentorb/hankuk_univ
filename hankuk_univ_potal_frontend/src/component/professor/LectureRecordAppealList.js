import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAtom, useAtomValue } from "jotai";
import { lectureAtom, tokenAtom } from "../../atoms";
import { Button, Input, Table } from "reactstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";
const LectureRecordAppealList = () => {
    const [token, setToken] = useAtom(tokenAtom);
    const lecture = useAtomValue(lectureAtom);
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [appealList, setAppealList] = useState();
    
    useEffect(() => {

        // let profNo = JSON.parse(sessionStorage.getItem("prof"));
        submit(1);
    }, [token])

    const submit = (page) => {
        axios.get(`${url}/appealList?lecNo=${lecture.lecNo}&status=${status}`,
            {
                headers: { Authorization: JSON.stringify(token) }
            }
        )
            .then(res => {
                console.log(res);
                setAppealList([...res.data])
            })
            .catch(err => {
                console.log(err);
            })
    }

    const AppealList = () => {
        let questions = [];
        for (let i = 0; i < appealList.length; i++) {
            questions.push(
                <div key={i} className='table_tr' onClick={() => navigate(`/professor/lectureModify/${appealList[i].lecNo}`)}>
                    <div className='table_td td1' style={{ marginLeft: '70px', marginRight: '50px' }}>{appealList[i].year}</div>
                    <div className='table_td' style={{ marginLeft: '34px', marginRight: '50px' }}>{appealList[i].semester}</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>{appealList[i].subName}</div>
                    <div className='table_td' style={{ marginLeft: '115px', marginRight: '0px' }}>{appealList[i].status}</div>
                </div>
            );
        }
        return questions;
    }
    return(
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>이의신청목록</b></Typography>
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
                            <b>이의신청목록</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <div style={{margin:'20px 0 20px 1000px'}}>
                <Input
                        className="Appeal_Input"
                        id="div"
                        name="div"
                        type="text"
                        // onChange={(e) => setDiv(e.target.value)}
                        >
                    </Input>
                    <Button className="Appeal_Button">조회</Button>
                    </div>
                <div className='Appeal_body'>
                    
                    {/* <div className='table_body'>
                        <div>
                            <div className='thead' style={{ marginLeft: '50px', marginRight: '50px' }}>개설년도</div>
                            <div className='thead' style={{ marginLeft: '20px', marginRight: '90px' }}>학기</div>
                            <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>과목</div>
                            <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>상태</div>
                        </div>
                        {LectureRecordAppealList()}
                    </div> */}
                    <table className="Appeal_Table">
                    
                        <thead className="Appeal_Table_Thead">
                            <th>등록날짜</th>
                            <th>학번</th>
                            <th>학생이름</th>
                            <th>상태</th>
                        </thead>
                        <tbody className="Appeal_Table_TBody">
                            <tr className="Appeal_Table_Tr">
                                <td className="Appeal_Table_Td">2024-06-17</td>
                                <td className="Appeal_Table_Td">2401563</td>
                                <td className="Appeal_Table_Td">홍길치</td>
                                <td className="Appeal_Table_Td">승인</td>
                            </tr>
                            <tr className="Appeal_Table_spacer"><td colSpan="6"></td></tr>
                            <tr className="Appeal_Table_Tr">
                                <td className="Appeal_Table_Td">2024-06-17</td>
                                <td className="Appeal_Table_Td">2401563</td>
                                <td className="Appeal_Table_Td">홍길치</td>
                                <td className="Appeal_Table_Td">승인</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                </Paper>
        </Grid>
    )
}
export default LectureRecordAppealList;