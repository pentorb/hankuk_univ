import Modal from 'react-modal';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { lectureAtom } from '../../atoms';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, Input} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import './staff.css';
import axios from 'axios';
import { url } from "../../config/config";
import Link from '@mui/material/Link';



const LectureApprove = () => {

  const [PdfmodalIsOpen, setPdfmodalIsOpen] = useState(false);
  const [ApprovemodalIsOpen, setApprovemodalIsOpen] = useState(false);
  const [colleages, setColleages] = useState([]);
  const [majors, setMajors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const token = useAtomValue(tokenAtom);
  const [pdfModalIsOpen, setPdfModalIsOpen] = useState(false);
  const [approveModalIsOpen, setApproveModalIsOpen] = useState(false);
  const [syllabusFile, setSyllabusFile] = useState('');
  const [selectedLectureNo, setSelectedLectureNo] = useState(null);
  const [searchType, setSearchType] = useState('major');
  const [searchInput, setSearchInput] = useState('');
  const [formData, setFormData] = useState({ colleage: '', major: '' });

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

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'colleage') {
      fetchMajors(value);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${url}/searchREQLecture`, {
        params: {
          name: searchType === 'name' ? searchInput : null,
          colleage: searchType === 'major' ? formData.colleage : null,
          major: searchType === 'major' ? formData.major : null,
        },
        headers: { "Authorization": JSON.stringify(token) }
      });
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const openPdfModal = (file) => {
    setSyllabusFile(file);
    setPdfModalIsOpen(true);
  };

  const closePdfModal = () => {
    setPdfModalIsOpen(false);
  };

  const openApproveModal = (lecNo) => {
    setSelectedLectureNo(lecNo);
    setApproveModalIsOpen(true);
  };

  const closeApproveModal = () => {
    setApproveModalIsOpen(false);
  };

  const handleApproveLecture = async () => {
    try {
      await axios.post(`${url}/approveLecture`, { lecNo: selectedLectureNo }, {
        headers: { "Authorization": JSON.stringify(token) }
      });
      alert("강의가 성공적으로 승인되었습니다.");
      closeApproveModal();
      handleSearch();
    } catch (error) {
      console.error("Error approving lecture:", error);
      alert("강의를 승인하는 중 오류가 발생했습니다.");
    }
  };

  const handleRejectLecture = async () => {
    try {
      await axios.post(`${url}/rejectLecture`, { lecNo: selectedLectureNo }, {
        headers: { "Authorization": JSON.stringify(token) }
      });
      alert("강의가 성공적으로 거절되었습니다.");
      closeApproveModal();
      handleSearch();
    } catch (error) {
      console.error("Error rejecting lecture:", error);
      alert("강의를 거절하는 중 오류가 발생했습니다.");
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
            {lectures.map((lecture, index) => (
              <tr key={index}>

                <td>{lecture.subCd}</td>
                <td>{lecture.subname}</td>
                <td>{lecture.grade}</td>
                <td>{lecture.credit}</td>
                <td>{lecture.prof}</td>
                <td>{lecture.time1},{lecture.time2}</td>
                <td>{lecture.lecRoom}</td>
                <td>{lecture.numOfStd}</td>
                <td>
                  <button onClick={() => openPdfModal(lecture.file)}>
                    <Tab icon={<FileOpenIcon sx={{ fontSize: 20 }} />} />
                  </button>
                </td>
                <td>
                  <button onClick={() => openApproveModal(lecture.lecNo)}>
                    승인
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <Modal
            isOpen={pdfModalIsOpen}
            onRequestClose={closePdfModal}
            contentLabel="수업계획서"
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                padding: '20px',
              },
            }}
          >
            <button onClick={closePdfModal}>
              X
            </button>
            <iframe src={syllabusFile} width="100%" height="100%"></iframe>
          </Modal>
          <Modal
            isOpen={approveModalIsOpen}
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
            <button onClick={closeApproveModal}>
              X
            </button>
            <button type="submit" style={{ color: 'white', backgroundColor: '#1F3468', border: 'none' }} onClick={handleApproveLecture}>승인</button>
            <button type="button" style={{ color: 'white', backgroundColor: '#D9D9D9', border: 'none' }} onClick={handleRejectLecture}>거절</button>
          </Modal>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LectureApprove;