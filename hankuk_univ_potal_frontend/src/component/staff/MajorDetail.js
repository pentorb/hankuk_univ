import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Button, Checkbox, Select, MenuItem, FormHelperText
} from '@mui/material';
import axios from 'axios';
import { url } from "../../config/config";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import './staff.css';
import './css/stf.css';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './staff.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import Swal from 'sweetalert2';
import { Input } from 'reactstrap';


const MajorDetail = () => {
    const { majCd } = useParams();
    const [major, setMajor] = useState({
        majCd: '',
        name: '',
        tel: '',
        reqGenCredit: 0,
        reqMajCredit: 0,
        gradCredit: 0,
        colCd: ''
    });
    const [subjects, setSubjects] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [headProfessor, setHeadProfessor] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isEditingMajor, setIsEditingMajor] = useState(false);
    const [isEditingSubject, setIsEditingSubject] = useState(false);
    const [newSubject, setNewSubject] = useState({
        year: '',
        courseType: '',
        subjectName: ''
    });

    const token = useAtomValue(tokenAtom);

    useEffect(() => {
        if(token == null || token =='') return;
        fetchMajorDetail();
        fetchSubjects();
        fetchProfessors();
    }, [token]);

    const fetchMajorDetail = async () => {
        try {
            const response = await axios.get(`${url}/majorsinformation`, {
                params: { majCd },
                headers: { "Authorization": JSON.stringify(token) }
            });
            setMajor(response.data);
        } catch (error) {
            console.error("Error fetching major details:", error);
        }
    };


    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${url}/subjectsByMajor`, {
                params: { majCd },
                headers: { "Authorization": JSON.stringify(token) }
            });
            setSubjects(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const fetchProfessors = async () => {
        try {
            const response = await axios.get(`${url}/professorsByMajor`, {
                params: { majCd },
                headers: { "Authorization": JSON.stringify(token) }
            });
            const professorsData = response.data;
            setProfessors(professorsData);

            const headProfessor = professorsData.find(prof => prof.position === "0");
            if (headProfessor) {
                setHeadProfessor(headProfessor.profNo);
            }
        } catch (error) {
            console.error("Error fetching professors:", error);
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedSubjects(subjects.map((subject) => subject.subCd));
        } else {
            setSelectedSubjects([]);
        }
    };

    const handleCheckboxChange = (e, subCd) => {
        if (e.target.checked) {
            setSelectedSubjects([...selectedSubjects, subCd]);
        } else {
            setSelectedSubjects(selectedSubjects.filter((code) => code !== subCd));
        }
    };

    const handleFieldChange = (e, field) => {
        setMajor({
            ...major,
            [field]: e.target.value,
        });
    };

    const handleSubjectFieldChange = (e, subjectCode, field) => {
        setSubjects(
            subjects.map((subject) =>
                subject.subjectCode === subjectCode ? { ...subject, [field]: e.target.value } : subject
            )
        );
    };

    const handleNewSubjectChange = (e) => {
        const { name, value } = e.target;
        setNewSubject({
            ...newSubject,
            [name]: value,
        });
    };

    const handleSaveMajor = async () => {
        try {
            const response = await axios.put(`${url}/updatemajors/${majCd}`, {
                name: major.name,
                tel: major.tel,
                reqGenCredit: major.reqGenCredit,
                reqMajCredit: major.reqMajCredit,
                gradCredit: major.gradCredit
            }, {
                headers: { "Authorization": JSON.stringify(token) }
            });
            Swal.fire('학과 정보가 성공적으로 저장되었습니다..', '', 'success');
            setIsEditingMajor(false);
        } catch (error) {
            console.error("Error saving major details:", error);
            Swal.fire('학과 정보를 저장하는 중 오류가 발생했습니다.', '', 'error');
        }
    };

    const handleSaveSubjects = async () => {
        try {
            const updatedSubjects = subjects.filter(subject => selectedSubjects.includes(subject.subjectCode));
            await axios.post(`${url}/updateSubjects`, updatedSubjects, {
                headers: { "Authorization": JSON.stringify(token) }
            });
            Swal.fire('과목 정보가 성공적으로 저장되었습니다.', '', 'success');
            setIsEditingSubject(false);  // 편집 모드 비활성화
            setSelectedSubjects([]);
        } catch (error) {
            Swal.fire('과목 정보를 저장하는 중 오류가 발생했습니다.', '', 'error');
            console.error("Error saving subjects:", error);
        }
    };


    const handleSelectHeadProfessor = async (e) => {
        const selectedProfNo = e.target.value;
        setHeadProfessor(selectedProfNo);

        try {
            await axios.post(`${url}/updateHeadProfessor`, null, {
                params: {
                    profNo: selectedProfNo,
                    majCd
                },
                headers: { "Authorization": JSON.stringify(token) }
            });
            Swal.fire('학과장이 성공적으로 설정되었습니다.', '', 'success');
        } catch (error) {
            console.error("Error updating head professor:", error);
            Swal.fire('학과정을 설정하는 중 오류가 발생했습니다.', '', 'error');
        }
    };


    const handleDeleteSubjects = async () => {
        try {
            await axios.post(`${url}/deleteSubjects`, selectedSubjects, {
                headers: { "Authorization": JSON.stringify(token) }
            });
            setSubjects(subjects.filter(subject => !selectedSubjects.includes(subject.subjectCode)));
            setSelectedSubjects([]);
            Swal.fire('선택한 과목이 삭제되었습니다.', '', 'success');
        } catch (error) {
            Swal.fire('과목 삭제 중 오류가 발생했습니다.', '', 'error');
            console.error("Error deleting subjects:", error);
        }
    };

    const handleAddSubject = async () => {
        console.log(token);
        try {
            const subjectToAdd = {
                name: newSubject.subjectName,
                type: newSubject.courseType,
                targetGrd: newSubject.year,
                majCd
            };

            console.log("Sending subject data to server:", subjectToAdd);

            const response = await axios.post(`${url}/addSubject`, subjectToAdd, {
                headers: { "Authorization": JSON.stringify(token) }
            });

            console.log("Response from server:", response.data);

            setSubjects([...subjects, response.data]);
            setNewSubject({
                year: '',
                courseType: '',
                subjectName: ''
            });

            Swal.fire('과목이 성공적으로 추가되었습니다.', '', 'success');
        } catch (error) {
            Swal.fire('과목 추가 중 오류가 발생했습니다.', '', 'error');
            console.error("Error adding subject:", error.response || error.message);
        }
    };



    const handleFileChange = async (e) => {
        console.log(token);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("majCd", majCd);
        formData.append("file", file);

        try {
            const response = await axios.post(`${url}/uploadSubjectExcel`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": JSON.stringify(token)
                }
            });
            Swal.fire('파일이 성공적으로 업로드 되었습니다.', '', 'success');
            fetchSubjects();
        } catch (error) {
            Swal.fire('파일 업로드 중 오류가 발생했습니다.', '', 'error');
            console.error("Error uploading file:", error);
        }
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
                            <Link color="inherit" underline='none'>
                                학과 관리
                            </Link>
                            <Link underline="inherit" color="#4952A9">
                                <b>{major.name}</b>
                            </Link>
                        </Breadcrumbs>
                    </div>

                    <div className="ccontainer">

                        <div className="ttitle" style={{ justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>학과 정보</b></span>
                            </div>
                            <div className="actions" style={{ paddingRight: '10px' }}>
                                {!isEditingMajor ? (
                                    <Button variant="contained" onClick={() => setIsEditingMajor(true)}
                                        style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }} >
                                        수정
                                    </Button>
                                ) : (
                                    <Button variant="contained" onClick={handleSaveMajor}
                                        style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }} >
                                        저장
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="major-info">

                            <div style={{ display: 'flex' }}>
                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-4 categori">학과명</div>
                                    <div className='col-8'>
                                        <Input placeholder="학과명" name="name" value={major.name}
                                            onChange={(e) => handleFieldChange(e, 'name')} readOnly={!isEditingMajor} />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-4 categori">단과</div>
                                    <div className='col-8'>
                                        <Input placeholder="단과" name="colCd" value="생명나노대학"
                                            onChange={(e) => handleFieldChange(e, 'colCd')} readOnly />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-5 categori">학과 코드</div>
                                    <div className='col-7'>
                                        <Input placeholder="학과 코드" name="majCd" value={major.majCd}
                                            onChange={(e) => handleFieldChange(e, 'majCd')} readOnly />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-4 categori">연락처</div>
                                    <div className='col-8'>
                                        <Input placeholder="학과 번호" name="tel" value={major.tel}
                                            onChange={(e) => handleFieldChange(e, 'tel')} readOnly={!isEditingMajor} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-5 categori">전체 학점</div>
                                    <div className='col-7'>
                                        <Input type='number' placeholder="전체 학점" name="gradCredit" value={major.gradCredit}
                                            onChange={(e) => handleFieldChange(e, 'gradCredit')} readOnly={!isEditingMajor} />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-5 categori">전공 학점</div>
                                    <div className='col-7'>
                                        <Input type='number' placeholder="전공 학점" name="reqMajCredit" value={major.reqMajCredit}
                                            onChange={(e) => handleFieldChange(e, 'reqMajCredit')} readOnly={!isEditingMajor} />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-5 categori">교양 학점</div>
                                    <div className='col-7'>
                                        <Input type='number' placeholder="교양 학점" name="reqGenCredit" value={major.reqGenCredit}
                                            onChange={(e) => handleFieldChange(e, 'reqGenCredit')} readOnly={!isEditingMajor} />
                                    </div>
                                </div>

                                <div className="col-3" style={{ display: 'flex', padding: '20px', alignItems: 'center' }}>
                                    <div className="col-5 categori">학과장</div>
                                    <div className='col-7'>
                                        <Input type="select" value={headProfessor} onChange={handleSelectHeadProfessor} onClick={fetchProfessors}>
                                            {professors.map((professor) => (
                                                <option key={professor.profNo} value={professor.profNo}>
                                                    {professor.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="ttitle" style={{ justifyContent: 'space-between', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>학과 정보</b></span>
                            </div>
                            <div className="actions" style={{ paddingRight: '10px' }}>
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
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            {subjects && subjects.length > 0 ? (<>
                                <table className='result-box'>
                                    <thead>
                                        <th style={{ width: '95.98px' }}>
                                            <Input type="checkbox" onChange={handleSelectAll}
                                                checked={selectedSubjects.length === subjects.length && subjects.length > 0} />
                                        </th>
                                        <th style={{ width: '229.39px' }}>과목코드</th>
                                        <th style={{ width: '152px' }}>학년</th>
                                        <th style={{ width: '246.64px' }}>이수 구분</th>
                                        <th style={{ width: '350px' }}>과목명</th>
                                    </thead>
                                </table>

                                <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
                                    <table className='result-box'>
                                        <tbody>
                                            {subjects.map((subject, index) => (
                                                <tr key={index}>
                                                    <td style={{ width: '95.98px' }}>
                                                        <Input type="checkbox" checked={selectedSubjects.includes(subject.subCd)}
                                                            onChange={(e) => handleCheckboxChange(e, subject.subCd)} />
                                                    </td>
                                                    <td style={{ width: '229.39px' }}>{subject.subCd}</td>
                                                    <td style={{ width: '152px' }}>{subject.targetGrd}</td>
                                                    <td style={{ width: '246.64' }}>
                                                        <Input type="select" value={subject.type}
                                                            onChange={(e) => handleSubjectFieldChange(e, subject.subCd, 'type')}
                                                            disabled={!isEditingSubject || !selectedSubjects.includes(subject.subCd)} >
                                                            <option value="P">필수</option>
                                                            <option value="S">선택</option>
                                                        </Input>
                                                    </td>
                                                    <td style={{ width: '350px' }}>
                                                        <Input value={subject.name} readOnly={!isEditingSubject || !selectedSubjects.includes(subject.subCd)}
                                                            onChange={(e) => handleSubjectFieldChange(e, subject.subCd, 'name')} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>) : (<>
                                <table className='result-box'>
                                    <thead>
                                        <tr>
                                            <th>이수 연도</th>
                                            <th>이수 구분</th>
                                            <th>과목명</th>
                                            <th>-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Input type="select" name="year" value={newSubject.year} onChange={handleNewSubjectChange} >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </Input>
                                            </td>
                                            <td>
                                                <Input type='select' name="courseType" value={newSubject.courseType} onChange={handleNewSubjectChange} >
                                                    <option value="P">필수</option>
                                                    <option value="S">선택</option>
                                                </Input>
                                            </td>
                                            <td>
                                                <Input placeholder="과목명" name="subjectName" value={newSubject.subjectName}
                                                    onChange={handleNewSubjectChange} />
                                            </td>
                                            <td>
                                                <Button variant="contained" style={{ color: 'white', backgroundColor: '#1F3468', marginTop: '10px' }} onClick={handleAddSubject} >
                                                    등록
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>)}

                        </div>

                        <div className="actions">
                            {!isEditingSubject ? (
                                <Button variant="contained" onClick={() => setIsEditingSubject(true)}
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}>
                                    수정
                                </Button>
                            ) : (
                                <Button variant="contained" onClick={handleSaveSubjects}
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }} >
                                    완료
                                </Button>
                            )}
                            <Button variant="contained" onClick={handleDeleteSubjects} disabled={selectedSubjects.length === 0}
                                style={{ color: 'white', backgroundColor: '#D9D9D9', marginRight: '10px', marginLeft: '10px' }} >
                                삭제
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MajorDetail;
