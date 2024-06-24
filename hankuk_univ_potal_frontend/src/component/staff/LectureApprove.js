import { lectureAtom } from '../../atoms';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Button, Select, MenuItem, Input, Checkbox } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import './staff.css';
import axios from 'axios';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';


const Example = () => {


  const [PdfmodalIsOpen, setPdfmodalIsOpen] = useState(false);
  const [ApprovemodalIsOpen, setApprovemodalIsOpen] = useState(false);

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

  const fetchMajors = async (colleageName) => {
    try {
      const response = await axios.get(`${url}/majorsBycolleage`, {
        params: {
          colCd: colleageName,
        },
        headers: { "Authorization": JSON.stringify(token) }
      });
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  const handleSearch = async () => {
    try {
        const response = await axios.get(`${url}/searchLecture`, {
          params: {
            name: searchType === 'name' ? searchInput : null,
            colleage: searchType === 'major' ? formData.colleage : null,
            major: searchType === 'major' ? formData.major : null,
          },
          headers: { "Authorization": JSON.stringify(token) }
        });
        setStudents(response.data);

    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };










  const openPdfModal = async () => {
    setPdfmodalIsOpen(true);
  };
  const closePdfModal = () => {
    setPdfmodalIsOpen(false);
  };
  const openApproveModal = async () => {
    setApprovemodalIsOpen(true);
  };
  const closeApproveModal = () => {
    setApproveModalIsOpen(false);
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
          <table className="search-box">
            <tr>
              <td>검색</td>
              <td>
                <select onChange={handleSearchTypeChange} className="search-select" defaultValue="major" >
                  <option value="major">전공별</option>
                  <option value="name">이름별</option>
                </select>
                {searchType === 'major' ? (
                  <>
                    <Select value={formData.colleage} onChange={handleInputChange} name="colleage" style={{ width: '120px', marginRight: '5px' }}>
                      {colleages.map((colleage) => (
                        <MenuItem key={colleage.colCd} value={colleage.colCd} >{colleage.name}</MenuItem>
                      ))}
                    </Select>
                    <Select value={formData.major} onChange={handleInputChange} name="major" style={{ width: '230px' }}>
                      {majors.map((major) => (
                        <MenuItem key={major.majCd} value={major.majCd}>{major.name}</MenuItem>
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


          <table className='result-box'>
            <tr>
              <td>과목코드</td>
              <td>과목명</td>
              <td>학년</td>
              <td>학점</td>
              <td>담당교수</td>
              <td>강의시간</td>
              <td>강의실</td>
              <td>수강인원</td>
              <td>수업계획서</td>
              <td>등록</td>
            </tr>
            {lecture.map((lecture, index) => (
              <tr key={index}>

              <td>{lecture.subCd}</td>
              <td>{lecture.subname}</td>
              <td>{lecture.garde}</td>
              <td>{lecture.credit}</td>
              <td>{lecture.prof}</td>
              <td>{lecture.time1},{lecture.time2}</td>
              <td>{lecture.lecRoom}</td>
              <td>
                <button onClick={openPdfModal}>
                  <Tab icon={<FileOpenIcon  sx={{ fontSize: 30 }} />} />
                </button>
              </td>
              <td>
                <button onClick={openApproveModal}>
                  
                </button>
              </td>
              </tr>
            ))}
          </table>
          <Modal
          isOpen={PdfmodalIsOpen}
          onRequestClose={closePdfModal}
          contentLabel="수업계획서"
          style={{
            content: {
              top: 'auto',
              left: 'auto',
              right: 'auto',
              bottom: 'auto',
              width: 'auto',
              height: 'auto',
              padding: '20px',
            },
          }}
          >
            <button onClick={colosePdfModal}>
              X
            </button>
            <iframe src={syllabusFile} width="100%" height="100%"></iframe>
          </Modal>
          <Modal
          isOpen={ApprovemodalIsOpen}
          onRequestClose={closeApproveModal}
          contentLabel="등록 팝업"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: 'auto',
              padding: '20px',
              borderRadius: '10px',
            },
          }}
          >
            <h2>승인하시겠습니까?</h2>
            <button onClick={coloseApproveModal}>
              X
            </button>
<button type="submit" style={{ color: 'white', backgroundColor: '#1F3468', border: 'none' }} >승인</button>
<button type="b" style={{ color: 'white', backgroundColor: '#D9D9D9', border: 'none' }} >거절</button>

          </Modal>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Example;