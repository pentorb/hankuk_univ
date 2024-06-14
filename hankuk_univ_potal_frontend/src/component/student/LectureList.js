import { Typography, Paper, Grid } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { tokenAtom, memberAtom, lectureNumberAtom, lectureNameAtom, activeTabAtom } from '../../atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';

const LectureList = () => {
    const member = useAtomValue(memberAtom);
    const token = useAtomValue(tokenAtom);
    const setLectureNumber = useSetAtom(lectureNumberAtom);
    const setLectureName = useSetAtom(lectureNameAtom);
    const setActiveTab = useSetAtom(activeTabAtom);
    const [lectureList, setLectureList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let formData = new FormData();
        formData.append("stdNo", member.id);

        axios.post(`${url}/lecture`, formData, {
            headers: { Authorization: JSON.stringify(token) }
        })
            .then(res => {
                setLectureList([...res.data.lectureList])
            })
            .catch(err => {
                console.log(err);
                setLectureList(null)
            })
    }, [])

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>과목</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                {/* ------Your content start------! */}
                <Grid container>
                    <Grid xs={12} sx={{height:100}}/>
                    <Grid xs={1}/>
                    <Grid xs={10}>
                        {lectureList !== null && (lectureList.map(lecture => (
                            <Card sx={{ minWidth:250, cursor:"pointer", borderRadius:3, display: "inline-block", marginRight:4, marginBottom:4 }}
                            onClick={() => {setLectureNumber(lecture.lecNo); setLectureName(lecture.lectureName); setActiveTab(5); navigate(`/student/${lecture.lecNo}`);}}>
                                <CardContent sx={{ height: 100, backgroundColor:"firstColor.main"  }}>
                                    <Typography variant="h6" component="div" sx={{color:"white", marginTop:3}}>
                                        <b>{lecture.lectureName}</b>
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="black">
                                        {lecture.professorName}<br/>
                                        {lecture.lectureRoom}
                                    </Typography>
                                </CardContent>
                            </Card>       
                        )))}                        
                    </Grid>
                    <Grid xs={1}/>
                </Grid>
                <br /><br />
                {/* ------Your content end------! */}
                <br />
            </Paper>
        </Grid>
    )
}

export default LectureList;