import { Grid, Paper, Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card, CardBody, Collapse } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../config/config";

const Contents = () => {
    const [lessonList, setLessonList] = useState([]);
    const [openIndexes, setOpenIndexes] = useState([]);

    const toggle = (index) => {
        setOpenIndexes((prevState) => {
            if (prevState.includes(index)) {
                return prevState.filter(i => i !== index);
            } else {
                return [...prevState, index];
            }
        });
    };

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`${url}/contents/lecNo=`);
                // Assuming response.data is an array of lessons
                setLessonList(response.data);
            } catch (error) {
                console.error("Error fetching lessons", error);
                // Mock data in case of error
                let mockData = [];
                for (let index = 0; index < 15; index++) {
                    mockData.push({ week: index + 1, content: `Content for week ${index + 1}` });
                }
                setLessonList(mockData);
            }
        };

        fetchLessons();
    }, []);

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom>
                <b>강의콘텐츠</b>
            </Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 과목  <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>강의콘텐츠</b></Typography>
                </Typography>
                <div className="Contents_Body">
                    {lessonList.map((lesson, i) => (
                            <div key={i} onClick={() => toggle(i)}
                                className="Contents_Top_Buttons"
                                style={{ backgroundColor: openIndexes.includes(i) ? '#1F3468' : 'white',
                                        color: openIndexes.includes(i) ? 'white' : '#1F3468'
                                 }}>
                                {i+1}
                            </div>
                            
                    ))}
                    {lessonList.map((lesson, i) => (
                        <div key={i}>
                            <div onClick={() => toggle(i)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <div style={{ display: 'inline-block', fontSize: '20px', margin: '10px 0' }}>{lesson.week}주차</div>
                                <div style={{ float: 'right', marginTop: '15px' }}>{openIndexes.includes(i) ? '△' : '▽'}</div>
                            </div>
                            <Collapse isOpen={openIndexes.includes(i)}>
                                <Card>
                                    <CardBody>
                                        {lesson.content}
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    ))}
                </div>
            </Paper>
        </Grid>
    );
};

export default Contents;
