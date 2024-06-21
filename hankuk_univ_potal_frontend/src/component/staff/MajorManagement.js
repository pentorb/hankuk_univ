import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Button, Select, MenuItem, Input, Checkbox, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { url } from "../../config/config";
import './staff.css';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';


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
                <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>계정관리</b></Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                    <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                            <Link underline="none" color="inherit" href="/student">
                                <HomeIcon />
                            </Link>
                            <Link color="inherit" underline='none'>
                                학사 지원
                            </Link>
                            <Link underline="hover" color="#4952A9">
                                <b>계정 관리</b>
                            </Link>
                        </Breadcrumbs>
                    </div>
                    <hr />
                    <div className="container">
                        <h2>학과 관리</h2>
                        <br />
                        <div className="search-section">
                            <div className="search-bar">
                                <table className="search-box">
                                    <tr>
                                        <td>검색</td>
                                        <td>
                                            <select onChange={handleSearchTypeChange} className="search-select" defaultValue="major" >
                                                <option value="colleage">단과별</option>
                                                <option value="name">이름별</option>
                                            </select>
                                            {searchType === 'colleage' ? (
                                                <>
                                                    <Select value={formData.colleage} onChange={handleInputChange} name="colleage" style={{ width: '120px', marginRight: '5px' }}>
                                                        {colleages.map((colleage) => (
                                                            <MenuItem key={colleage.colCd} value={colleage.colCd} >{colleage.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </>
                                            ) : (
                                                <Input
                                                    className="searchname"
                                                    type="text"
                                                    placeholder="이름을 입력하세요"
                                                    value={searchInput}
                                                    onChange={(e) => setSearchInput(e.target.value)}
                                                />
                                            )}
                                            <button onClick={handleSearch} variant="contained" className='searchbutton'>조회</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="result-section">
                            <table className={'major-result-box'}>
                                {majors.map((major, index) => (
                                    <tr key={index} onClick={() => navigate(`/staff/majordetail/${major.majCd}`)} className={'major-result-box-tr'}>
                                        <td>{major.majCd}</td>
                                        <td>{major.colleage}</td>
                                        <td>{major.name}</td>
                                        <td>{major.professor}</td>
                                    </tr>
                                ))}

                            </table>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default MajorManagement;