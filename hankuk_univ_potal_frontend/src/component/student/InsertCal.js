import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import * as React from 'react';
import { Input, Label } from 'reactstrap';
import { Button } from 'reactstrap';
import axios from 'axios';

const InsertCal = () => {
    const categori = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        fontSize: "larger",
        textAlign: "left",
        color: "#4952A9"
    }

    const [selectedValue, setSelectedValue] = React.useState('0');
    const [formValues, setFormValues] = React.useState({
        calStartDt: null,
        calEndDt: null,
        title: '',
        type: '',
        content: ''
    });

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleDateChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("calStartDt", formValues.calStartDt);
        formData.append("calEndDt", formValues.calEndDt);
        formData.append("title", formValues.title);
        formData.append("type", formValues.type);
        formData.append("content", formValues.content);
        formData.append("allDay", selectedValue);

        axios.post('http://localhost:8090/calInsert', formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>일정 등록</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "100vh", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <Typography ml={5} mt={3} mb={4} variant="h7">
                    <HomeIcon /> 일정 관리 <KeyboardDoubleArrowRightIcon /> <Typography sx={{ display: "inline", color: "#4952A9" }}><b>일정등록</b></Typography>
                </Typography>
                <form onSubmit={submit}>
                    <Grid container spacing={1} style={{ padding: "20px", display: 'flex' }}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={10}>
                            <div style={{ justifyContent: 'column', display: 'flex', alignItems: 'center', padding: '50px 0px 50px' }}>
                                <Grid item xs={2}>
                                    <div style={categori}>일시</div>
                                </Grid>
                                <Grid item xs={10} style={{ justifyContent: 'column', display: 'flex', alignItems: 'center' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker', 'DatePicker']} >
                                            <DatePicker
                                                label="시작 일자"
                                                value={formValues.calStartDt}
                                                onChange={(newValue) => handleDateChange('calStartDt', newValue)}
                                                style={{ backgroundColor: '#E5E5E8' }}
                                                id="calStartDt"
                                                name="calStartDt"
                                            />
                                            <DatePicker
                                                label="종료 일자"
                                                value={formValues.calEndDt}
                                                onChange={(newValue) => handleDateChange('calEndDt', newValue)}
                                                id="calEndDt"
                                                name="calEndDt"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input type="checkbox" value="1" id="allDay" name="allDay" onChange={handleChange} />&nbsp;&nbsp;하루 종일
                                </Grid>
                            </div>
                            <div style={{ justifyContent: 'column', display: 'flex', alignItems: 'center', paddingBottom: '50px' }}>
                                <Grid item xs={2}>
                                    <div style={categori}>제목</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="일정명"
                                        type="text"
                                        value={formValues.title}
                                        onChange={handleInputChange}
                                        style={{ height: '55px', backgroundColor: '#E5E5E8' }}
                                    />
                                </Grid>
                                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }} >
                                    <div style={categori}>분류</div>
                                </Grid>
                                <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Input
                                        id="type"
                                        name="type"
                                        type="select"
                                        value={formValues.type}
                                        onChange={handleInputChange}
                                        style={{ height: '55px', backgroundColor: '#E5E5E8' }}
                                    >
                                        <option>학교</option>
                                        <option>약속</option>
                                        <option>과제</option>
                                        <option>시험</option>
                                    </Input>
                                </Grid>
                            </div>
                            <div style={{ justifyContent: 'column', display: 'flex', paddingBottom: '50px' }}>
                                <Grid item xs={2}>
                                    <div style={categori}>메모</div>
                                </Grid>
                                <Grid item xs={10} style={{ justifyContent: 'column', display: 'flex', alignItems: 'center' }}>
                                    <Input
                                        id="content"
                                        name="content"
                                        type="textarea"
                                        value={formValues.content}
                                        onChange={handleInputChange}
                                        style={{ height: '230px', backgroundColor: '#E5E5E8' }}
                                    />
                                </Grid>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button type="submit" style={{ backgroundColor: '#1F3468' }}><b>일정 등록</b></Button>
                            </div>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default InsertCal;
