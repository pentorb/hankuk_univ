import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Button, Select, MenuItem, Input, Checkbox } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Modal from 'react-modal';
import './staff.css';
import axios from 'axios';
import { url } from "../../config/config";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {tokenAtom} from "../../atoms";
import {useAtomValue} from 'jotai';

const AccountManagement = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [searchType, setSearchType] = useState('major');
  const [searchInput, setSearchInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    id: '',
    colleage: '',
    major: '',
    name: '',
    password: '1234',
  });
  const [colleages, setColleages] = useState([]);
  const [majors, setMajors] = useState([]);
  const [searchCategory, setSearchCategory] = useState('student');
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const token = useAtomValue(tokenAtom);
  
  useEffect(() => {
    fetchcolleages();
  }, [token]);

  const fetchcolleages = async () => {
    try {
      const response = await axios.get(`${url}/colleagesSearchList`,
        {headers: {"Authorization": JSON.stringify(token)}}
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
        headers: {"Authorization": JSON.stringify(token)}
      });
      setMajors(response.data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchCategory === 'student') {
        const response = await axios.get(`${url}/searchStudents`, {
          params: {
            name: searchType === 'name' ? searchInput : null,
            colleage: searchType === 'major' ? formData.colleage : null,
            major: searchType === 'major' ? formData.major : null,
          },
          headers: {"Authorization": JSON.stringify(token)}
        });
        setStudents(response.data);
      } else if (searchCategory === 'professor') {
        const response = await axios.get(`${url}/searchProfessors`, {
          params: {
            name: searchType === 'name' ? searchInput : null,
            colleage: searchType === 'major' ? formData.colleage : null,
            major: searchType === 'major' ? formData.major : null,
          },
          headers: {"Authorization": JSON.stringify(token)}
        });
        setProfessors(response.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleFileChange = async (e) => {
    console.log(token)
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("category", searchCategory);
    formData.append("file", file);

    try {
      const response = await axios.post(`${url}/uploadExcel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": JSON.stringify(token)
        }
      });
      alert("Data uploaded successfully");
      handleSearch();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  const openModal = async () => {
    setModalIsOpen(true);
    if (!formData.category) {
      setFormData((prevData) => ({
        ...prevData,
        category: 'student',
      }));
      await generateStudentId();
    } else {
      if (formData.category === 'student') {
        await generateStudentId();
      } else if (formData.category === 'professor') {
        await generateProfessorId();
      }
    }
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) {
        alert("구분을 선택해주세요.");
        return;
    }

    try {
        const payload = {
            id: formData.id,
            name: formData.name,
            tel: formData.tel,
            password: formData.password,
            major: formData.major,
        };

        if (formData.category === 'student') {
            await axios.post(`${url}/registerStudent`, payload, {headers:{ "Authorization": JSON.stringify(token) }});
            alert("학생이 성공적으로 등록되었습니다.");
        } else if (formData.category === 'professor') {
            await axios.post(`${url}/registerProfessor`, payload, {headers:{ "Authorization": JSON.stringify(token) }});
            alert("교수가 성공적으로 등록되었습니다.");
        }
    } catch (error) {
        console.error("Error registering:", error);
        alert("등록 중 오류가 발생했습니다.");
    }
    closeModal();
};


  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'colleage') {
      fetchMajors(value);
    }

    if (name === 'category') {
      if (value === 'student') {
        await generateStudentId();
      } else if (value === 'professor') {
        await generateProfessorId();
      }
    }
  };



  const generateStudentId = async () => {
    try {
      const response = await axios.get(`${url}/createStudentId`, {
        headers: {"Authorization": JSON.stringify(token)}
      });
      setFormData((prevData) => ({
        ...prevData,
        id: response.data,
      }));
    } catch (error) {
      console.error("Error generating student ID:", error);
    }
  };

  const generateProfessorId = async () => {
    try {
      const response = await axios.get(`${url}/createProfessorId`,{
        headers: {"Authorization": JSON.stringify(token)}
      });
      setFormData((prevData) => ({
        ...prevData,
        id: response.data,
      }));
    } catch (error) {
      console.error("Error generating professor ID:", error);
    }
  };


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      if (searchCategory === 'student') {
        setSelectedIds(students.map(student => student.id));
      } else if (searchCategory === 'professor') {
        setSelectedIds(professors.map(professor => professor.id));
      }
    } else {
      setSelectedIds([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };
  const handleSave = async () => {
    try {
      if (searchCategory === 'student') {
        const updatedStudents = students
          .filter(student => selectedIds.includes(student.id))
          .map(student => ({
            id: student.id,
            name: student.name, 
            tel: student.tel 
          }));
  
        console.log("Sending students to server for update:", updatedStudents);
  
        await axios.post(`${url}/updateStudents`, updatedStudents, {
          headers: { "Authorization": JSON.stringify(token) }
        });
      } else if (searchCategory === 'professor') {
        const updatedProfessors = professors
          .filter(professor => selectedIds.includes(professor.id))
          .map(professor => ({
            id: professor.id,
            name: professor.name,
            tel: professor.tel 
          }));
  
        console.log("Sending professors to server for update:", updatedProfessors);
  
        await axios.post(`${url}/updateProfessors`, updatedProfessors, {
          headers: { "Authorization": JSON.stringify(token) }
        });
      }
  
      alert("수정이 완료되었습니다.");
      setEditMode(false);
      setSelectedIds([]);
    } catch (error) {
      console.error("Error saving records:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };
  
  
  const handleDelete = async () => {
    try {
      if (searchCategory === 'student') {
        await axios.post(`${url}/deleteStudents`, selectedIds, {headers:{"Authorization": JSON.stringify(token)}});
        setStudents(students.filter(student => !selectedIds.includes(student.id)));
      } else if (searchCategory === 'professor') {
        await axios.post(`${url}/deleteProfessors`, selectedIds, {headers:{"Authorization": JSON.stringify(token)}});
        setProfessors(professors.filter(professor => !selectedIds.includes(professor.id)));
      }
      alert("삭제가 완료되었습니다.");
      setSelectedIds([]);
    } catch (error) {
      console.error("Error deleting records:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    if (selectedIds.length === 0) {
      alert("수정할 항목을 선택하세요."); // 선택된 항목이 없으면 경고 메시지 표시
      return;
    }
    setEditMode(true);
  };

  const handleFieldChange = (e, id, field) => {
    if (searchCategory === 'student') {
      setStudents(students.map(student => 
        selectedIds.includes(student.id) && student.id === id ? 
        { ...student, [field]: e.target.value } : 
        student
      ));
    } else if (searchCategory === 'professor') {
      setProfessors(professors.map(professor => 
        selectedIds.includes(professor.id) && professor.id === id ? 
        { ...professor, [field]: e.target.value } : 
        professor
      ));
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
          <div className="container">
            <h2>계정검색</h2>
            <br />
            <div className="search-section">
              <div className="search-bar">
                <table className="search-box">
                  <tr>
                    <td>구분</td>
                    <td>
                      <select name="searchCategory" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="search-select">
                        <option value="student">학생</option>
                        <option value="professor">교수</option>
                      </select>
                    </td>
                  </tr>
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
              </div>
            </div>
            <br />
            <div className="upload-section">
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                .excel 파일을 첨부해 업로드가 가능합니다
                <Tab icon={<DriveFolderUploadIcon sx={{ fontSize: 30 }} />} />
              </label>
            </div>
            <div className='resultdiv'>
              <table className='result-box'>
                <thead>
                  <tr>
                    <th><input type="checkbox" onChange={handleSelectAll} /></th>
                    <th>아이디(학번/교번)</th>
                    <th>이름</th>
                    <th>전공</th>
                    <th>번호</th>
                  </tr>
                </thead>
                <tbody>
                  {searchCategory === 'student' && students.map((student, index) => (
                    <tr key={index}>
                      <td><Checkbox checked={selectedIds.includes(student.id)} onChange={(e) => handleCheckboxChange(e, student.id)} /></td>
                      <td>{student.id}</td>
                      <td>
                        <Input
                          value={student.name}
                          readOnly={!editMode || !selectedIds.includes(student.id)} 
                          onChange={(e) => handleFieldChange(e, student.id, 'name')}
                        />
                      </td>
                      <td>{student.majCd}</td>
                      <td>
                        <Input
                          value={student.tel}
                          readOnly={!editMode || !selectedIds.includes(student.id)} 
                          onChange={(e) => handleFieldChange(e, student.id, 'tel')}
                        />
                      </td>
                    </tr>
                  ))}
                  {searchCategory === 'professor' && professors.map((professor, index) => (
                    <tr key={index}>
                      <td><Checkbox checked={selectedIds.includes(professor.id)} onChange={(e) => handleCheckboxChange(e, professor.id)} /></td>
                      <td>{professor.id}</td>
                      <td>
                        <Input
                          value={professor.name}
                          readOnly={!editMode || !selectedIds.includes(professor.id)} 
                          onChange={(e) => handleFieldChange(e, professor.id, 'name')}
                        />
                      </td>
                      <td>{professor.majCd}</td>
                      <td>
                        <Input
                          value={professor.tell}
                          readOnly={!editMode || !selectedIds.includes(professor.id)} 
                          onChange={(e) => handleFieldChange(e, professor.id, 'tell')}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="actions">
              <button style={{ color: '#1F3468', backgroundColor: 'white' }} onClick={openModal}>등록</button>
              {!editMode && (
                <Button variant="contained" style={{ color: 'white', backgroundColor: '#1F3468', border: 'none' }} onClick={handleEdit}>수정</Button>
              )}
              {editMode && (
                <Button variant="contained" style={{ color: 'white', backgroundColor: '#1F3468' }} onClick={handleSave}>저장</Button>
              )}
              <button style={{ color: 'white', backgroundColor: '#D9D9D9', border: 'none' }} onClick={handleDelete}>삭제</button>
            </div>
          </div>
        </Paper>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
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
              height: '450px',
              padding: '20px',
              borderRadius: '10px',
            },
          }}
        >
          <h2>등록</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <table className='AccountForm'>
              <tr>
                <th><label>구분</label></th>
                <th><select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', height: '30px' }}>
                  <option value="">선택하세요</option>
                  <option value="student">학생</option>
                  <option value="professor">교수</option>
                </select></th>
              </tr>
              <tr>
                <th><label>아이디(교번)</label></th>
                <th><input type="text" name="id" value={formData.id} onChange={handleInputChange} readOnly /></th>
              </tr>
              <tr>
                <th><label>소속</label></th>
                <th>
                  <Select value={formData.colleage} onChange={handleInputChange} name="colleage" style={{ width: '100%', height: '30px' }}>
                    {colleages.map((colleage) => (
                      <MenuItem key={colleage.colCd} value={colleage.colCd} >{colleage.name}</MenuItem>
                    ))}
                  </Select>
                </th>
                </tr>
                <tr>
                  <th></th>
                  <th>
                    <Select value={formData.major} onChange={handleInputChange} name="major" style={{ width: '100%', height: '30px' }}>
                      {majors.map((major) => (
                        <MenuItem key={major.majCd} value={major.majCd}>{major.name}</MenuItem>
                      ))}
                    </Select>
                  </th>
                </tr>
                <tr>
                </tr>
                <tr>
                  <th><label>이름</label></th>
                  <th><input type="text" name="name" value={formData.name} onChange={handleInputChange} /></th>
                </tr>
                <tr>
                  <th><label>비밀번호</label></th>
                  <th><input type="text" name="password" value={formData.password} readOnly /></th>
                </tr>
            </table>
            <br />
            <div className='actions2'>
              <button type="submit" style={{ color: 'white', backgroundColor: '#1F3468', border: 'none' }} >등록</button>
              <button type="button" style={{ color: 'white', backgroundColor: '#D9D9D9', border: 'none' }} onClick={closeModal}>취소</button>
            </div>
          </form>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default AccountManagement;
