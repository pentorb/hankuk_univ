import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, Input, FormHelperText } from '@mui/material';
import axios from 'axios';
import { url } from "../../config/config";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



const MajorCreate = () => {
  const [formData, setFormData] = useState({
    majorName: '',
    colleage: '',
    majorCode: '',
    majorNumber: '',
    totalCredits: '',
    majorCredits: '',
    generalEducationCredits: ''
  });
  const [colleages, setColleages] = useState([]);
  const [majorCodeError, setMajorCodeError] = useState('');
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchColleages();
  }, [token]);

  const fetchColleages = async () => {
    try {
      const response = await axios.get(`${url}/colleagesSearchList`,
        { headers: { "Authorization": JSON.stringify(token) } }
      );
      setColleages(response.data);
    } catch (error) {
      console.error("Error fetching colleages:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'majorCode') {
      validateMajorCode(value);
    }
  };

  const validateMajorCode = async (majorCode) => {
    if (!/^[A-Za-z]{2,4}$/.test(majorCode)) {
      setMajorCodeError('영어 2~4자로 완성해주세요');
      return;
    }

    try {
      const response = await axios.get(`${url}/checkMajorCode`, {
        params: { majCd: majorCode },
        headers: { "Authorization": JSON.stringify(token) }
      });

      if (response.data === true) {
        setMajorCodeError('이미 존재하는 학과 코드입니다');
      } else {
        setMajorCodeError('');
      }
    } catch (error) {
      console.error("Error checking major code:", error);
    }
  };

  const handleSaveMajor = async () => {
    if (majorCodeError) return;

    try {
      const payload = { ...formData };
      await axios.post(`${url}/createMajor`, payload, {
        headers: { "Authorization": JSON.stringify(token) }
      });
      alert("학과가 성공적으로 개설되었습니다.");
      navigate(`/staff/majordetail/${formData.majorCode}`);
    } catch (error) {
      console.error("Error creating major:", error);
      alert("학과 개설 중 오류가 발생했습니다.");
    }
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
          <div className="major-create-container">
            <div className="major-info-section">
              <h2>학과 정보</h2>
              <div className="majcreateform-row">
                <div className="majcreateform-group">
                  <Input
                    placeholder="학과명"
                    name="majorName"
                    value={formData.majorName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="majcreateform-group">
                  <Select
                    placeholder="단과"
                    name="colleage"
                    value={formData.colleage}
                    onChange={handleInputChange}
                    fullWidth
                  >
                    {colleages.map(colleage => (
                      <MenuItem key={colleage.colCd} value={colleage.colCd}>{colleage.name}</MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="majcreateform-row">
                <div className="majcreateform-group">
                  <Input
                    placeholder="학과 코드 (영어 2~4자)"
                    name="majorCode"
                    value={formData.majorCode}
                    onChange={handleInputChange}
                    error={!!majorCodeError}
                    fullWidth
                  />
                  {majorCodeError && <FormHelperText error>{majorCodeError}</FormHelperText>}
                </div>
                <div className="majcreateform-group">
                  <Input
                    placeholder="학과 번호"
                    name="majorNumber"
                    value={formData.majorNumber}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="graduation-criteria-section">
              <h2>졸업기준 설정</h2>
              <div className="majcreateform-row">
                <div className="majcreateform-group">
                  <Input
                    placeholder="전체학점"
                    name="totalCredits"
                    value={formData.totalCredits}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="majcreateform-group">
                  <Input
                    placeholder="전공"
                    name="majorCredits"
                    value={formData.majorCredits}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="majcreateform-group">
                  <Input
                    placeholder="교양"
                    name="generalEducationCredits"
                    value={formData.generalEducationCredits}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="actions">
              <Button
                variant="contained"
                style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                onClick={handleSaveMajor}
                disabled={!!majorCodeError}
              >
                개설
              </Button>
              <Button
                variant="contained"
                style={{ color: 'white', backgroundColor: '#D9D9D9' }}
              >
                취소
              </Button>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MajorCreate;