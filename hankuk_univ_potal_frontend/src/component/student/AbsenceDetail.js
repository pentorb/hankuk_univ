import { Typography, Paper, Button, Grid, MenuItem, Select } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom, selectedNumberAtom, lectureNameAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const AbsenceDetail = () => {
    const lessonNo = useAtomValue(selectedNumberAtom);
    const lectureName = useAtomValue(lectureNameAtom);
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [information, setInformation] = useState({lectureName:'', professorName:'', type:'', content:'', week:'', count:'', fileName:''});
    const [files, setFiles] = useState();
    const navigate = useNavigate();
    const { absNo } = useParams();

    useEffect(() => {
        let formData = new FormData();
        formData.append("lessonNo", lessonNo);
        formData.append("stdNo", member.id);

        axios.post(`${url}/load-absence-information`, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setInformation({...information, ...res.data.absenceInformation});
            })
            .catch(err => {
                console.log(err);
            })
    }, [token])

    const modifyAbsence = () => {
        let formData = new FormData();
        formData.append("absNo", absNo);
        formData.append("content", information.content);
        formData.append("type", information.type);
        formData.append("files", files);

        const absenceUrl = `${url}/modify-absence`;
        axios.post(absenceUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                navigate("/student/:lecNo/attendance")
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeValue = (e) => {
        setInformation({...information, [e.target.name]:e.target.value});
    }

    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        setInformation({...information, fileName: e.target.files[0].name});
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>공결 신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            과목
                        </Link>
                        <Link color="inherit" underline='none'>
                            {lectureName}
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>공결 신청</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <hr />
                {/* ------Your content start------! */}
                <Grid container spacing={3}>
                    <FormGrid item xs={12} sx={{ height: 30 }} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5 }}><b>구&nbsp;&nbsp;&nbsp;분</b></Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Select value={information.type} onChange={changeValue} name="type" sx={{ borderRadius: 5, width:400 }}>
                            <MenuItem value={"01"}>일반</MenuItem>
                            <MenuItem value={"02"}>병결</MenuItem>
                            <MenuItem value={"44"}>여학생공결</MenuItem>
                            <MenuItem value={"21"}>예비군</MenuItem>
                        </Select>
                    </FormGrid>
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5 }}><b>강의명</b></Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={information.lectureName} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5 }}><b>교수명</b></Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={information.professorName} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1 }}><b>학&nbsp;&nbsp;&nbsp;번</b></Typography>
                        &nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={member.id} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1 }}><b>이&nbsp;&nbsp;&nbsp;름</b></Typography>
                        &nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={member.name} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1 }}><b>주&nbsp;&nbsp;&nbsp;차</b></Typography>
                        &nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={information.week} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={5} sx={{ display: "block" }}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1 }}><b>차&nbsp;&nbsp;&nbsp;시</b></Typography>
                        &nbsp;&nbsp;&nbsp;
                        <OutlinedInput value={information.count} sx={{ borderRadius: 5, display: "inline-block", width:400 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={12} sx={{ height: 30 }} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={10}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1, marginBottom:1 }}><b>내&nbsp;&nbsp;&nbsp;용</b></Typography>
                        <OutlinedInput value={information.content} name="content" onChange={changeValue} sx={{ borderRadius: 5, marginLeft:4, marginRight:5, height:200}}/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={12} sx={{ height: 30 }} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={10}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1, marginBottom:1 }}><b>파일 업로드</b></Typography>
                        <OutlinedInput type="file" id="file" onChange={changeFile} sx={{ borderRadius: 5, marginLeft:4, marginRight:5 }} hidden/>
                        <OutlinedInput type="text" value={information.fileName} sx={{ borderRadius: 5, marginLeft:4, marginRight:5 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={12} sx={{ height: 60 }} />
                </Grid>
                <div>
                    <Button variant="contained" size="large" onClick={modifyAbsence} sx={{ float:"right", backgroundColor: "firstColor.main", marginRight:20 }}>수정</Button>
                    <Button variant="contained" size="large" onClick={() => document.getElementById('file').click()} sx={{ float:"right", backgroundColor: "firstColor.main", marginRight:2 }}>첨부</Button>
                </div>
                <br/><br/>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default AbsenceDetail;