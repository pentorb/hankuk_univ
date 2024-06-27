import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormHelperText } from '@mui/material';
import axios from 'axios';
import { url } from "../../config/config";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './css/stf.css';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { Input } from 'reactstrap';
import Swal from 'sweetalert2';



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
    if (!/^[A-Za-z]{3}$/.test(majorCode)) {
      setMajorCodeError('영어 3자로 완성해주세요');
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
      Swal.fire('학과가 성공적으로 개설되었습니다.', '', 'success');
      navigate(`/staff/majordetail/${formData.majorCode}`);
    } catch (error) {
      console.error("Error creating major:", error);
      Swal.fire('학과 개설 중 오류가 발생했습니다.', '', 'error');
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>학과 개설</b></Typography>
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
                <b>학과 개설</b>
              </Link>
            </Breadcrumbs>
          </div>

          <div className="ccontainer">
            <div className="ttitle">
              <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
              <span style={{ fontSize: 'x-large' }}><b>학과정보입력</b></span>
            </div>
            <div className="col-12" style={{ display: 'flex' }}>
              <div className="col-6 menuBox" >
                <span className="col-4 categori">단과</span>
                <div className="col-6">
                  <Input type="select" name="colleage" value={formData.colleage} onChange={handleInputChange}>
                    <option>선택하세요</option>
                    {colleages.map(colleage => (
                      <option key={colleage.colCd} value={colleage.colCd}>{colleage.name}</option>
                    ))}
                  </Input>
                </div>
              </div>
              <div className="col-6 menuBox">
                <span className="col-4 categori" >학과명</span>
                <div className="col-6">
                  <Input type="text" placeholder='학과명' name="majorName" value={formData.majorName} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="col-12" style={{ display: 'flex', marginBottom: '30px', height: '75px' }}>
              <div className="col-6 menuBox">
                <span className="col-4 categori" >학과 코드</span>
                <div className="col-6" style={{ padding: '30px 0px' }}>
                  <Input placeholder="학과 코드 (영어 2~4자)" name="majorCode" value={formData.majorCode} onChange={handleInputChange} error={!!majorCodeError} />
                  {majorCodeError && <FormHelperText error>{majorCodeError}</FormHelperText>}
                </div>
              </div>
              <div className='col-6 menuBox'>
                <span className="col-4 categori" >학과 번호</span>
                <div className='col-6'>
                  <Input placeholder="학과 번호" name="majorNumber" value={formData.majorNumber} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="ttitle">
              <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
              <span style={{ fontSize: 'x-large' }}><b>졸업기준 설정</b></span>
            </div>

            <div className="col-12" style={{ display: 'flex', marginBottom: '30px', height: '75px' }}>

              <div className="col-4 menuBox">
                <span className="col-4 categori" >전체 학점</span>
                <div className="col-6">
                  <Input placeholder="전체학점" name="majorCredits" value={formData.majorCredits} onChange={handleInputChange}/>
                </div>
              </div>

              <div className="col-4 menuBox">
                <span className="col-4 categori" >전공 학점</span>
                <div className="col-6">
                  <Input placeholder="전공학점" name="totalCredits" value={formData.totalCredits} onChange={handleInputChange}/>
                </div>
              </div>

              <div className="col-4 menuBox">
                <span className="col-4 categori" >교양 학점</span>
                <div className="col-6">
                  <Input placeholder="교양학점" name="generalEducationCredits" value={formData.generalEducationCredits} onChange={handleInputChange}/>
                </div>
              </div>

            </div>

            <div className="col-12" style={{justifyContent:'center', display:'flex'}}>
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
    </Grid >
  )
}

export default MajorCreate;