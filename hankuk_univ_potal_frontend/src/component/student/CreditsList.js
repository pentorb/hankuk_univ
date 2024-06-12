import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BarChart, Bar, XAxis, Legend, ResponsiveContainer, LabelList, Label } from 'recharts';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import { url } from '../../config/config';
import { memberAtom, tokenAtom } from '../../atoms';


const data = [
    {
        name: '총 이수 학점',
        uv: 128,
        pv: 96,
        amt: 128,
    },
    {
        name: '전공',
        uv: 72,
        pv: 56,
        amt: 72,
    },
    {
        name: '교양',
        uv: 56,
        pv: 36,
        amt: 36,
    },
    {
        name: '채플',
        uv: 4,
        pv: 2,
        amt: 4,
    }
];

const changeLegend = (value) => {
    if (value === 'uv') return '졸업 기준 학점';
    if (value === 'pv') return '나의 이수 학점';
    return value;
}

const CreditsList = () => {
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);


    useEffect(() => {
        if (token.access_token === '') return
        // axios.get(`${url}/credits?stdNo=${member.id}`, { headers: { Authorization: JSON.stringify(token) } })
        //     .then(res=> {
        //         console.log(res.data);
                
        //     })
    })

    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>학점 이수 현황</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            졸업
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>학점 이수 현황</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ResponsiveContainer width="80%" height={500}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <Legend iconType='square' formatter={changeLegend} />
                                    <XAxis dataKey="name" fontSize={20} tick={{strokeWidth: 5}}  />
                                    <Bar dataKey="uv" fill="#97A8D1" radius={[150, 150, 0, 0]} barSize={80}>
                                        <LabelList dataKey="uv" position="top" />
                                    </Bar>
                                    <Bar dataKey="pv" fill="#1F3468" radius={[150, 150, 0, 0]} barSize={80}>
                                        <LabelList dataKey="pv" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{padding:'40px 70px', color:'darkgray', fontSize:'20px'}}>
                           <li>해당 정보는 시점에 따라 변경될 수 있습니다.</li>
                           <li>최종 정보는 반드시 해당 학과에 확인해주시기 바랍니다.</li>
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default CreditsList;
