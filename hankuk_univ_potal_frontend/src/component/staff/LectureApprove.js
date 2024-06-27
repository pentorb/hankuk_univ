import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { lectureAtom } from '../../atoms';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Select, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import './staff.css';
import axios from 'axios';
import { url } from "../../config/config";
import Link from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import syllabusFile from '../../assets/newEnergySyllabus.pdf';
import { Input, Button, Table, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import Swal from 'sweetalert2';


const LectureApprove = () => {

  const [ApprovemodalIsOpen, setApprovemodalIsOpen] = useState(false);
  const [colleages, setColleages] = useState([]);
  const [majors, setMajors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const token = useAtomValue(tokenAtom);
  const [pdfModalIsOpen, setPdfModalIsOpen] = useState(false);
  const [searchType, setSearchType] = useState('major');
  const [searchInput, setSearchInput] = useState('');
  const [formData, setFormData] = useState({ colleage: '', major: '' });
  const toggle = () => setPdfModalIsOpen(!pdfModalIsOpen);

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

  const openPdfModal = (file, name) => {
    // setSyllabusFile(file);
    setPdfModalIsOpen(true);
  };


const alert = (lecture) => {
  Swal.fire({
      title: '강의 개설을 승인하시겠습니까?',
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "승인",
      denyButtonText: `반려`
  }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${url}/approveLecture`, { lecNo: lecture.lecNo }, {
          headers: { "Authorization": JSON.stringify(token) }
        })
        .then(res => {
          Swal.fire('승인되었습니다.', '', 'success');
          handleSearch();
        })
        .catch(err => {
          console.error("Error approving lecture:", err);
          Swal.fire("강의를 승인하는 중 오류가 발생했습니다.", err.message, "error");
        });
      } else if (result.isDenied) {
        axios.post(`${url}/rejectLecture`, { lecNo: lecture.lecNo }, {
          headers: { "Authorization": JSON.stringify(token) }
        })
        .then(res => {
          Swal.fire('반려되었습니다.', '', 'warning');
        })
        .catch(err => {
          console.error("Error rejecting lecture:", err);
          Swal.fire("강의를 반려하는 중 오류가 발생했습니다.", err.message, "error");
        });
      }
  });
};



  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>강의 등록</b></Typography>
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
                <b>강의 등록</b>
              </Link>
            </Breadcrumbs>
          </div>

          <div style={{ padding: '30px 130px' }}>
            <div style={{ paddingBottom: '20px', display: 'flex' }}>
              <div className='col-6'></div>
              <div className='col-6' style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <div className="col-3">
                  <Input type="select" onChange={handleSearchTypeChange} defaultValue="major" style={{ height: '44px' }} >
                    <option value="major">전공별</option>
                    <option value="name">이름별</option>
                  </Input>
                </div>

                <div className='col-9' style={{ display: 'flex' }}>
                  {searchType === 'major' ? (
                    <>
                      <Input type="select" value={formData.colleage} onChange={handleInputChange} name="colleage" style={{ width: '150px', marginRight: '5px' }}>
                        {colleages.map((colleage) => (
                          <option key={colleage.colCd} value={colleage.colCd} >{colleage.name}</option>
                        ))}
                      </Input>
                      {/* <Select value={formData.major} onChange={handleInputChange} name="major" style={{ width: '230px' }}>
                      {majors.map((major) => (
                        <MenuItem key={major.majCd} value={major.majCd}>{major.name}</MenuItem>
                      ))}
                    </Select> */}
                      <Input type="select" value={formData.major} onChange={handleInputChange} name="major" style={{ width: '200px' }}>
                        {majors.map((major) => (
                          <option key={major.majCd} value={major.majCd}>{major.name}</option>
                        ))}
                      </Input>
                    </>
                  ) : (
                    <Input className="searchname" type="text"
                      placeholder="이름을 입력하세요" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                  )}
                  <div>
                    <Button onClick={handleSearch} style={{ backgroundColor: '#1F3468', color: 'white' }}><SearchIcon /></Button>
                  </div>
                </div>
              </div>
            </div>


            <table className='result-box'>
              <thead style={{ backgroundColor: '#191964', color: 'white' }}>
                <tr>
                  <th>과목코드</th>
                  <th>과목명</th>
                  <th>학년</th>
                  <th>학점</th>
                  <th>담당교수</th>
                  <th style={{ width: '226.33px' }}>강의시간</th>
                  <th>강의실</th>
                  <th>수강인원</th>
                  <th>수업계획서</th>
                  <th>등록</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#d9dee3' }}>
                {lectures.length === 0 ? (<>
                  <tr style={{height:'55px'}}><td colSpan="10">신청 내역이 없습니다.</td></tr>
                  </>) : ( <>
                    {lectures.map((lecture, index) => (
                      <tr key={index}>
                        <td>{lecture.subCd}</td>
                        <td>{lecture.subName}</td>
                        <td>{lecture.grade}학년</td>
                        <td>{lecture.credit}학점</td>
                        <td>{lecture.prof}</td>
                        <td>{lecture.time1},{lecture.time2}</td>
                        <td>{lecture.lecRoom}</td>
                        <td>{lecture.numOfStd}</td>
                        <td>
                          <div onClick={() => openPdfModal(lecture.file, lecture.name)}>
                            <PictureAsPdfIcon style={{ color: '#7e7e7e' }} />
                          </div>
                        </td>
                        <td>
                          <Button onClick={()=>alert(lecture)}>승인</Button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>

            <Modal isOpen={pdfModalIsOpen} toggle={toggle} >
              <ModalHeader toggle={toggle} isOpen={pdfModalIsOpen} >수업 계획서</ModalHeader>
              <ModalBody>
                <iframe src= {syllabusFile} width="100%" height="600"></iframe>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>
                  닫기
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LectureApprove;