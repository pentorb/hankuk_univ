import { Typography, Paper, Button, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom, selectedNumberAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import { url } from '../../config/config';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const Appeal = () => {
    const lectureNumber = useAtomValue(selectedNumberAtom);
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const [information, setInformation] = useState({});
    const [content, setContent] = useState();
    const [files, setFiles] = useState();
    const [fileName, setFileName] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        let formData = new FormData();
        formData.append("lectureNumber", lectureNumber);
        formData.append("stdNo", member.id);

        axios.post(`${url}/load-appeal-information`, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setInformation(res.data.appealInformation);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const makeAppeal = () => {
        let formData = new FormData();
        formData.append("stdNo", member.id);
        formData.append("lecNo", lectureNumber);
        formData.append("content", content);
        formData.append("files", files);

        const appealUrl = `${url}/make-appeal`;
        console.log(appealUrl);
        axios.post(appealUrl, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                navigate("/student/appeal-list")
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const changeFile = (e) => {
        setFiles(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>이의신청</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin:'24px 40px 32px'}}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            마이페이지
                        </Link>
                        <Link color="inherit" underline='none'>
                            성적
                        </Link>
                        <Link color="inherit" underline='none'>
                            성적조회
                        </Link>
                        <Link color="#4952A9" underline='none'>
                            <b>이의신청</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <hr />
                {/* ------Your content start------! */}
                <Grid container spacing={3}>
                    <FormGrid item xs={12} sx={{ height: 50 }} />
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
                    <FormGrid item xs={12} sx={{ height: 10 }} />
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
                    <FormGrid item xs={12} sx={{ height: 50 }} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={10}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1, marginBottom:1 }}><b>내&nbsp;&nbsp;&nbsp;용</b></Typography>
                        <OutlinedInput onChange={changeContent} sx={{ borderRadius: 5, marginLeft:4, marginRight:5, height:200}} required/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={12} sx={{ height: 20 }} />
                    <FormGrid item xs={1} />
                    <FormGrid item xs={10}>
                        <Typography sx={{ display: "inline-block", marginLeft:5, marginRight:1, marginBottom:1 }}><b>파일 업로드</b></Typography>
                        <OutlinedInput type="file" id="file" onChange={changeFile} sx={{ borderRadius: 5, marginLeft:4, marginRight:5 }} hidden/>
                        <OutlinedInput type="text" value={fileName} sx={{ borderRadius: 5, marginLeft:4, marginRight:5 }} readOnly/>
                    </FormGrid>
                    <FormGrid item xs={1} />
                    <FormGrid item xs={12} sx={{ height: 50 }} />
                </Grid>
                <div>
                    <Button variant="contained" size="large" onClick={makeAppeal} sx={{ float:"right", backgroundColor: "firstColor.main", marginRight:20 }}>신청</Button>
                    <Button variant="contained" size="large" onClick={() => document.getElementById('file').click()} sx={{ float:"right", backgroundColor: "firstColor.main", marginRight:2 }}>첨부</Button>
                </div>
                <br/><br/>
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default Appeal;