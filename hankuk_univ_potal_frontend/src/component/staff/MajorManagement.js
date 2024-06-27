import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Select, MenuItem, Checkbox, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { url } from "../../config/config";
import './css/stf.css';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Table, Input, Button } from 'reactstrap';


const MajorManagement = () => {
    const [searchType, setSearchType] = useState('colleage');
    const [searchInput, setSearchInput] = useState('');
    const [formData, setFormData] = useState({
        colleage: '',
        major: '',
        name: '',
    });
    const [colleages, setColleages] = useState([]);
    const [majors, setMajors] = useState([]);
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();


    useEffect(() => {
        fetchcolleages();
    }, [token]);

    const fetchcolleages = async () => {
        try {
            const response = await axios.get(`${url}/colleagesSearchList`,
                { headers: { "Authorization": JSON.stringify(token) } }
            );
            setColleages(response.data);
        } catch (error) {
            console.error("Error fetching colleages:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${url}/searchMajors`, {
                params: {
                    name: searchType === 'name' ? searchInput : null,
                    colleage: searchType === 'colleage' ? formData.colleage : null,
                },
                headers: { "Authorization": JSON.stringify(token) }
            });
            setMajors(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>학과 관리</b></Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                    <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                            <Link underline="none" color="inherit" href="/student">
                                <HomeIcon />
                            </Link>
                            <Link color="inherit" underline='none'>
                                학사 운영
                            </Link>
                            <Link underline="hover" color="#4952A9">
                                <b>학과 관리</b>
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <div className="ccontainer">
                        <div style={{ display: 'flex', marginBottom:'10px' }}>
                            <div className='col-6'></div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className='col-6'>
                                <div className="col-3">
                                    <Input type="select" onChange={handleSearchTypeChange} defaultValue="major" style={{height:'44px'}} >
                                        <option value="colleage">단과별</option>
                                        <option value="name">이름별</option>
                                    </Input>
                                </div>
                                <div className="col-7" style={{ display: 'flex' }}>
                                    <div style={{ width: '80%' }}>
                                        {searchType === 'colleage' ? (
                                            <>
                                                <Input type="select" value={formData.colleage} onChange={handleInputChange} name="colleage" style={{height:'44px'}}>
                                                    {colleages.map((colleage) => (
                                                        <option key={colleage.colCd} value={colleage.colCd} >{colleage.name}</option>
                                                    ))}
                                                </Input>
                                            </>
                                        ) : (
                                            <Input type="text" placeholder="이름을 입력하세요" value={searchInput} 
                                                   onChange={(e) => setSearchInput(e.target.value)} style={{height:'44px'}}/>
                                        )}
                                    </div>
                                    <div>
                                        <Button onClick={handleSearch} style={{ backgroundColor: '#1F3468', color: 'white' }}><SearchIcon /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '20px' }}>
                            <Table className="majorTable" bordered >
                                <thead style={{ fontSize: '22px' }}>
                                    <tr>
                                        <th>학과코드</th>
                                        <th>소속단과</th>
                                        <th>학과명</th>
                                        <th>학과장</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {majors.length === 0 ? (
                                        <tr><td colSpan="4">검색 결과가 없습니다.</td></tr>
                                    ) : (<>
                                        {majors.map((major, index) => (
                                            <tr key={index} onClick={() => navigate(`/staff/majordetail/${major.majCd}`)}>
                                                <td>{major.majCd}</td>
                                                <td>{major.colleage}</td>
                                                <td style={{textDecoration:'underline', cursor:'pointer'}}>{major.name}</td>
                                                <td>{major.professor}</td>
                                            </tr>
                                        ))}
                                    </>)}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default MajorManagement;