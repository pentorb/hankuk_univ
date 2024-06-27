import Grid from '@mui/material/Grid';
import { Paper, Typography, Stack, Pagination, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Table, Input } from 'reactstrap';
import '../student/css/HueAndBok.css';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from 'jotai/react';
import { url } from '../../config/config';
import { tokenAtom, memberAtom } from '../../atoms';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Navigate } from 'react-router';
import Swal from "sweetalert2";

const typeMap = {
    p: '출산, 임신 휴학',
    k: '육아 휴학',
    o: '일반 휴학',
    m: '군 휴학',
    s: '창업 휴학',
    i: '질병 휴학'
};

const statusMap = {
    REQ: '신청',
    REJ: '반려',
    APP: '승인'
};
const text = {
    display: "flex",
    margin: "10px",
    fontWeight: "bold",
    fontSize: "larger",
    textAlign: "left"
}

function getStatusStyle(status) {
    switch (status) {
        case 'REQ':
            return { color: 'blue' };
        case 'APP':
            return { color: 'green' };
        case 'REJ':
            return { color: 'red' };
        default:
            return {};
    }
}

function parseSemester(data) {
    const year = Math.floor(data / 100);
    const semester = data % 100;
    return `${year}년도 ${semester}학기`;
}


const ResSemester = () => {
    const [huebok, setHuebok] = useState([]);
    const token = useAtomValue(tokenAtom);
    const member = useAtomValue(memberAtom);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [close, setClose] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        curPage: 1,
        startPage: 1,
        endPage: 1,
        allPage: 1
    });
    const [pageBtn, setPageBtn] = useState([]);
    const [hueDetail, setHueDetail] = useState([]);

    useEffect(() => {
        if (token.access_token === '') return
        fetchData(1);
    }, [token, type, status]);

    const fetchData = (page) => {
        const listUrl = `${url}/hueListByStdNo?stdNo=${member.id}&page=${page}&status=${status}&type=${type}`;
        console.log(listUrl);
        axios.get(listUrl, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                setHuebok([...res.data.huebok]);
                setPageInfo({ ...res.data.pageInfo });
                // 페이지 버튼 설정
                let pageButtons = [];
                for (let i = res.data.pageInfo.startPage; i <= res.data.pageInfo.endPage; i++) {
                    pageButtons.push(i);
                }
                setPageBtn([...pageButtons]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handlePageChange = (page) => {
        fetchData(page); // 페이지 변경 시 데이터 다시 가져오기
    };

    // const handleTypeChange = (e) => {
    //     const selectData = e.target.value;
    //     setType(selectData);
    // }

    // const handleStatusChange = (e) => {
    //     const selectData = e.target.value;
    //     setStatus(selectData);
    // }

    const dataChange = (e) => {
        const { name, value } = e.target;
        setHueDetail((prevDetail) => ({
            ...prevDetail,
            [name]: value,
        }));
        setFormValues({ ...formValues, [name]: value });
    }

    // const dataChange = (e) => {
    //     const { name, value } = e.target;

    // };


    const [formValues, setFormValues] = React.useState({
        // name: '',
        stdNo: member.id,
        type: '',
        year: '',
        sem: '',
        files: '',
        reason: ''
    });

    const trClick = (hb) => {
        setClose(true);

        axios.get(`${url}/hueDetail?hueNo=${hb.hueNo}`, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                const huehak = res.data; // 서버에서 반환한 데이터 객체
                setHueDetail(huehak); // hueDetail 상태 업데이트
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    return (
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>잔여학기 조회</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/student">
                            <HomeIcon />
                        </Link>
                        <Link color="inherit" underline='none'>
                            학적
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>잔여학기 조회</b>
                        </Link>
                    </Breadcrumbs>
                </div>
                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>휴학 신청 현황</b></span>
                        </div>
                        <div style={{ padding: '0px 50px 0px', textAlign: 'center', fontSize: 'larger' }}>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {/* <Input type="select" className="selBox" name="status" onChange={handleStatusChange}> */}
                                <Input type="select" className="selBox" name="status" onChange={(e) => setStatus(e.target.value)}>
                                    <option>처리 현황</option>
                                    <option value="REQ">신청</option>
                                    <option value="REJ">반려</option>
                                    <option value="APP">승인</option>
                                </Input>&nbsp;&nbsp;&nbsp;
                                <Input type="select" className="selBox" id="type" name="type" onChange={(e) => setType(e.target.value)}>
                                    <option>구분</option>
                                    <option value="o">일반 휴학</option>
                                    {member.gender !== 'F' ? (<><option value="m">군 휴학</option></>) : ''}
                                    <option value="p">출산, 임신 휴학</option>
                                    <option value="s">창업 휴학</option>
                                    <option value="i">질병 휴학</option>
                                    <option value="k">육아 복학</option>
                                </Input>
                            </div>

                            <Table className="table" bordered hover>
                                <thead>
                                    <tr>
                                        <th>휴학 번호</th>
                                        <th>휴학 유형</th>
                                        <th>휴학 신청 일자</th>
                                        <th>휴학 학기</th>
                                        <th>처리 상태</th>
                                        <th>상세보기</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {huebok.length === 0 ? (
                                        <tr><td colspan="6">신청 내역이 없습니다.</td></tr>
                                    ) : (<>
                                        {huebok.filter(hue => hue.sect === 'H').map(hue => (
                                            <tr key={hue.hueNo}>
                                                <td scope="row">{hue.hueNo}</td>
                                                <td>{typeMap[hue.type] || hue.type}</td>
                                                <td>{hue.appDt}</td>
                                                <td>{parseSemester(hue.hueSem)}</td>
                                                <td style={getStatusStyle(hue.status)}>
                                                    {statusMap[hue.status] || hue.status}
                                                </td>
                                                {hue.status === 'REJ' ? (
                                                    // <td><Button variant="text" onClick={() => trClick(hue)}>상세보기</Button></td>
                                                    <td><div style={{cursor:'pointer', color:"navy"}} onClick={() => trClick(hue)}>상세보기</div></td>
                                                ) : (
                                                    <td onClick={(e) => setClose(false)}>-</td>
                                                )
                                                }
                                            </tr>
                                        ))}
                                    </>
                                    )}
                                </tbody>
                            </Table>
                            <Stack spacing={2} alignItems="center" sx={{ marginBottom: 1 }}>
                                <Pagination count={pageInfo.allPage} page={pageInfo.curPage} onChange={(e, page) => handlePageChange(page)} />
                            </Stack>
                        </div>

                        <Divider sx={{ margin: 3 }} />

                        <div className="categori">
                            <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                            <span style={{ fontSize: 'x-large' }}><b>반려사유 확인하기</b></span>
                        </div>
                        {!close && (
                            <>
                                <div className="viewDetail">
                                    선택된 휴학 내역이 없습니다.
                                </div>
                            </>
                        )}
                        {/* <form onSubmit={submit}> */}
                        <div className="col-12 rejText">
                            <span>반려사유를 제대로 숙지하고 다시 휴학신청을 해주시기 바랍니다.</span>
                        </div>
                        <div style={{ display: 'flex', padding: '10px' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">이름</div>
                                <div className="col-6">
                                    <Input type="text" id="name" name="name"
                                        placeholder={member.name}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">학번</div>
                                <div className="col-6">
                                    <Input type="text" id="stdNo" name="stdNo"
                                        placeholder={member.id}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">유형</div>
                                <div className="col-6">
                                    <Input type="select" id="type" name="type"
                                        value={hueDetail.type} disabled>
                                        <option>---선택하세요---</option>
                                        <option value="o">일반 휴학</option>
                                        {member.gender !== 'F' ?
                                            (<>
                                                <option value="m">군 휴학</option>
                                            </>
                                            ) : (<></>)
                                        }
                                        <option value="p">출산, 임신 휴학</option>
                                        <option value="s">창업 휴학</option>
                                        <option value="i">질병 휴학</option>
                                        <option value="k">육아 복학</option>
                                    </Input>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', padding: '10px' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">휴학년도</div>
                                <div className="col-6">
                                    <Input type="text" id="year" name="year"
                                        placeholder='2024' value={hueDetail.year} disabled
                                    />
                                </div>
                            </div>

                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">휴학학기</div>
                                <div className="col-6">
                                    <Input type="select" id="sem" name="sem"
                                        value={hueDetail.sem} disabled >
                                        <option>학기 선택</option>
                                        <option value="01">1학기</option>
                                        <option value="02">2학기</option>
                                    </Input>
                                </div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={text} className="col-4">첨부자료</div>
                                <div className="col-6">
                                    <Input type="file" id="files" name="files"
                                        style={{ width: '100%' }}
                                        onChange={dataChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '10px 0px 50px', display: 'flex' }}>
                            <div className='col-6'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-3">휴학 사유</div>
                                </div>
                                <div style={{ padding: '5px 0px 0px 15px' }}>
                                    <Input type="textarea" id="reason" name="reason"
                                        value={hueDetail.reason || ''}
                                        style={{ width: '98%', padding: '30px' }}
                                        onChange={dataChange} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={text} className="col-3">반려 사유</div>

                                </div>
                                <div style={{ padding: '5px 0px 0px 15px' }}>
                                    <Input type="textarea" id="reason" name="reason"
                                        value={hueDetail.rejResult}
                                        style={{ width: '98%', padding: '30px' }}
                                        disabled />
                                </div>
                            </div>
                        </div>

                        {/* </form> */}

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ResSemester;