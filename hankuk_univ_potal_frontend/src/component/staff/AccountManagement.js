import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Paper, Typography, Select, MenuItem, Checkbox } from '@mui/material';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './css/stf.css';
import axios from 'axios';
import { url } from "../../config/config";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import Swal from 'sweetalert2';

const AccountManagement = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [searchType, setSearchType] = useState('major');
  const [searchInput, setSearchInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggle = () => setModalIsOpen(!modalIsOpen);
  const [formData, setFormData] = useState({
    category: '',
    id: '',
    colleage: '',
    major: '',
    name: '',
    password: '1234',
    professor: '',
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
      const response = await axios.get(`${url}/colleagesSearchList`, {
        headers: { "Authorization": JSON.stringify(token) }
      });
      if (Array.isArray(response.data)) {
        setColleages(response.data);
      } else {
        console.error("Expected an array response for colleages.");
      }
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

  const fetchProfessor = async (majorName) => {
    try {
      const response = await axios.get(`${url}/professorsByMajor`, {
        params: {
          majCd: majorName,
        },
        headers: { "Authorization": JSON.stringify(token) }
      });
      setProfessors(response.data);
    } catch (error) {
      console.error("Error fetching professors:", error);
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
          headers: { "Authorization": JSON.stringify(token) }
        });
        setStudents(response.data);
      } else if (searchCategory === 'professor') {
        const response = await axios.get(`${url}/searchProfessors`, {
          params: {
            name: searchType === 'name' ? searchInput : null,
            colleage: searchType === 'major' ? formData.colleage : null,
            major: searchType === 'major' ? formData.major : null,
          },
          headers: { "Authorization": JSON.stringify(token) }
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
      Swal.fire('데이터를 성공적으로 업로드 되었습니다.', '', 'success');
      handleSearch();
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire('파일 업로드 중 오류가 발생했습니다.', '', 'error');
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
      Swal.fire('구분을 선택해주세요.', '', 'question');
      return;
    }

    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        tel: formData.tel,
        password: formData.password,
        major: formData.major,
        professor: formData.professor,
      };

      if (formData.category === 'student') {
        await axios.post(`${url}/registerStudent`, payload, { headers: { "Authorization": JSON.stringify(token) } });
        Swal.fire('학생이 성공적으로 등록되었습니다.', '', 'success');
      } else if (formData.category === 'professor') {
        await axios.post(`${url}/registerProfessor`, payload, { headers: { "Authorization": JSON.stringify(token) } });
        Swal.fire('교수가 성공적으로 등록되었습니다.', '', 'success');
        await fetchProfessor(formData.major);
      }
    } catch (error) {
      console.error("Error registering:", error);
      Swal.fire('등록 중 오류가 발생했습니다.', '', 'error');
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

    if (name === 'major' && formData.category === 'student') {
      fetchProfessor(value);
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
        headers: { "Authorization": JSON.stringify(token) }
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
      const response = await axios.get(`${url}/createProfessorId`, {
        headers: { "Authorization": JSON.stringify(token) }
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
      Swal.fire('수정이 완료되었습니다.', '', 'success');
      setEditMode(false);
      setSelectedIds([]);
    } catch (error) {
      Swal.fire('수정 중 오류가 발생했습니다.', '', 'error');
      console.error("Error saving records:", error);
    }
  };


  const handleDelete = async () => {
    try {
      if (searchCategory === 'student') {
        await axios.post(`${url}/deleteStudents`, selectedIds, { headers: { "Authorization": JSON.stringify(token) } });
        setStudents(students.filter(student => !selectedIds.includes(student.id)));
      } else if (searchCategory === 'professor') {
        await axios.post(`${url}/deleteProfessors`, selectedIds, { headers: { "Authorization": JSON.stringify(token) } });
        setProfessors(professors.filter(professor => !selectedIds.includes(professor.id)));
      }
      Swal.fire('삭제가 완료되었습니다.', '', 'success');
      setSelectedIds([]);
    } catch (error) {
      Swal.fire('삭제 중 오류가 발생했습니다.', '', 'error');
      console.error("Error deleting records:", error);
    }
  };

  const handleEdit = () => {
    if (selectedIds.length === 0) {
      Swal.fire('수정할 항목을 선택하세요.', '', 'warning');
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
        <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>계정 관리</b></Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
          <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
              <Link underline="none" color="inherit" href="/student">
                <HomeIcon />
              </Link>
              <Link color="inherit" underline='none'>
                학생 지원
              </Link>
              <Link underline="hover" color="#4952A9">
                <b>계정 관리</b>
              </Link>
            </Breadcrumbs>
          </div>

          <div className="ccontainer">
            <div style={{ display: 'flex', padding: '30px 30px 15px', justifyContent: 'space-between' }}>
              <div >
                <Input type="select" name="searchCategory" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{ width: '200px' }}>
                  <option value="student">학생</option>
                  <option value="professor">교수</option>
                </Input>
              </div>

              <div style={{ display: 'flex' }}>
                <Input type="select" onChange={handleSearchTypeChange} defaultValue="major" style={{ width: '120px' }} >
                  <option value="major">전공별</option>
                  <option value="name">이름별</option>
                </Input>
                {searchType === 'major' ? (
                  <>
                    <Input type="select" value={formData.colleage} onChange={handleInputChange} name="colleage" style={{ width: '150px' }}>
                      {colleages.map((colleage) => (
                        <option key={colleage.colCd} value={colleage.colCd} >{colleage.name}</option>
                      ))}
                    </Input>
                    <Input type="select" value={formData.major} onChange={handleInputChange} name="major" style={{ width: '250px' }}>
                      {majors.map((major) => (
                        <option key={major.majCd} value={major.majCd}>{major.name}</option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <Input type="text" placeholder="이름을 입력하세요" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                )}
                <div>
                  <Button onClick={handleSearch} style={{ backgroundColor: '#1F3468', color: 'white' }}><SearchIcon /></Button>
                </div>
              </div>
            </div>

            <div className="upload-section">
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <DriveFolderUploadIcon sx={{ fontSize: 30 }} /> .excel 파일을 첨부해 업로드가 가능합니다
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <table className='result-box'>
                <thead style={{ height: '75px', fontSize: '20px' }}>
                  <tr>
                    <th style={{ width: '95.98px' }}><input type="checkbox" onChange={handleSelectAll} /></th>
                    <th style={{ width: '214.28px' }}>아이디(학번/교번)</th>
                    <th style={{ width: '250px' }}>이름</th>
                    <th style={{ width: '240.73px' }}>전공</th>
                    <th style={{ width: '250px' }}>번호</th>
                  </tr>
                </thead>
              </table>

              <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
                <table className='result-box'>
                  <tbody>
                    {searchCategory === 'student' && students.map((student, index) => (
                      <tr key={index}>
                        <td><input type="checkbox" style={{ padding: '15px' }} checked={selectedIds.includes(student.id)} onChange={(e) => handleCheckboxChange(e, student.id)} /></td>
                        <td>{student.id}</td>
                        <td style={{ width: "250px" }}>
                          <Input value={student.name} readOnly={!editMode || !selectedIds.includes(student.id)}
                            onChange={(e) => handleFieldChange(e, student.id, 'name')}
                          />
                        </td>
                        <td>{student.majName}</td>
                        <td style={{ width: "250px" }}>
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
            </div>
            <div className="actions">
              <button style={{ color: '#1F3468', backgroundColor: 'white' }} onClick={openModal}>계정 생성</button>
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

        <Modal isOpen={modalIsOpen} toggle={toggle} onRequestClose={closeModal} >
          <ModalHeader toggle={toggle} isOpen={modalIsOpen}>
            <span style={{ fontSize: '22px' }}><b>신규 계정 생성</b></span>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <table className='AccountForm'>
                <tbody>
                  <tr>
                    <th><label>구분</label></th>
                    <td>
                      <Input type="select" name="category" value={formData.category} onChange={handleInputChange} >
                        <option value="">선택하세요</option>
                          <option value="student">학생</option>
                          <option value="professor">교수</option>
                      </Input>
                    </td>
                  </tr>

                  <tr>
                    <th><label>아이디(교번)</label></th>
                    <td><Input type="text" name="id" value={formData.id} onChange={handleInputChange} disabled /></td>
                  </tr>

                  <tr>
                    <th><label>소속</label></th>
                    <td>
                      <Input type="select" value={formData.colleage} onChange={handleInputChange} name="colleage">
                        {colleages.map((colleage) => (
                          <option key={colleage.colCd} value={colleage.colCd} >{colleage.name}</option>
                        ))}
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <Input type="select" value={formData.major} onChange={handleInputChange} name="major">
                        {majors.map((major) => (
                          <option key={major.majCd} value={major.majCd}>{major.name}</option>
                        ))}
                      </Input>
                    </td>
                  </tr>

                  {formData.category === 'student' && (
                    <tr>
                      <th><label>담당교수</label></th>
                      <td>
                        <Input type="select" value={formData.professor} onChange={handleInputChange} name="professor">
                            <option>선택하시오</option>
                          {professors.map((professor) => (
                            <option key={professor.profNo} value={professor.profNo}>{professor.name}</option>
                          ))}
                        </Input>
                      </td>
                    </tr>
                  )}

                  <tr>
                    <th><label>이름</label></th>
                    <td><Input type="text" name="name" value={formData.name} onChange={handleInputChange} /></td>
                  </tr>

                  <tr>
                    <th><label>비밀번호</label></th>
                    <td><Input type="text" name="password" value={formData.password} readOnly /></td>
                  </tr>

                </tbody>
              </table>
              <hr />
              <div className='actions2' style={{paddingTop:'10px'}}>
                <Button type="submit" style={{ color: 'white', backgroundColor: '#1F3468', border: 'none' }} >등록</Button>
                <Button type="button" style={{ color: 'white', backgroundColor: '#D9D9D9', border: 'none' }} onClick={closeModal}>취소</Button>
              </div>
            </form>
          </ModalBody>
        </Modal>



      </Grid>
    </Grid>
  );
};

export default AccountManagement;
