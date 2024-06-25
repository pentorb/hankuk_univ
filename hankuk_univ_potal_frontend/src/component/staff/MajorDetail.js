import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Button, Input, Checkbox, Select, MenuItem, FormHelperText
} from '@mui/material';
import axios from 'axios';
import { url } from "../../config/config";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import './staff.css';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import './staff.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


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
            setSelectedSubjects(subjects.map((subject) => subject.subjectCode));
        } else {
            setSelectedSubjects([]);
        }
    };

    const handleCheckboxChange = (e, subjectCode) => {
        if (e.target.checked) {
            setSelectedSubjects([...selectedSubjects, subjectCode]);
        } else {
            setSelectedSubjects(selectedSubjects.filter((code) => code !== subjectCode));
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
            alert("학과 정보가 성공적으로 저장되었습니다.");
            setIsEditingMajor(false);
        } catch (error) {
            console.error("Error saving major details:", error);
            alert("학과 정보를 저장하는 중 오류가 발생했습니다.");
        }
    };

    const handleSaveSubjects = async () => {
        try {
            const updatedSubjects = subjects.map(subject => {
                if (selectedSubjects.includes(subject.subCd)) {
                    return {
                        ...subject,
                        name: subject.name,
                        year: subject.targetGrd,
                        courseType: subject.type
                    };
                }
                return subject;
            }).filter(subject => selectedSubjects.includes(subject.subCd));

            await axios.post(`${url}/updateSubjects`, updatedSubjects, {
                headers: { "Authorization": JSON.stringify(token) }
            });

            alert("과목 정보가 성공적으로 저장되었습니다.");
            setIsEditingSubject(false);
            setSelectedSubjects([]);
        } catch (error) {
            console.error("Error saving subjects:", error);
            alert("과목 정보를 저장하는 중 오류가 발생했습니다.");
        }
    };


    const handleSelectHeadProfessor = async (profNo) => {
        try {
            await axios.post(`${url}/updateHeadProfessor`, null, {
                params: {
                    profNo,
                    majCd
                },
                headers: { "Authorization": JSON.stringify(token) }
            });
            alert("학과장이 성공적으로 설정되었습니다.");
        } catch (error) {
            console.error("Error updating head professor:", error);
            alert("학과장을 설정하는 중 오류가 발생했습니다.");
        }
    };
    

    const handleDeleteSubjects = async () => {
        try {
            await axios.post(`${url}/deleteSubjects`, selectedSubjects, {
                headers: { "Authorization": JSON.stringify(token) }
            });
            setSubjects(subjects.filter(subject => !selectedSubjects.includes(subject.subjectCode)));
            setSelectedSubjects([]);
            alert("선택한 과목이 삭제되었습니다.");
        } catch (error) {
            console.error("Error deleting subjects:", error);
            alert("과목 삭제 중 오류가 발생했습니다.");
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
    
            alert("과목이 성공적으로 추가되었습니다.");
        } catch (error) {
            console.error("Error adding subject:", error.response || error.message);
            alert("과목 추가 중 오류가 발생했습니다.");
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
            alert("파일이 성공적으로 업로드되었습니다.");
            fetchSubjects();
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("파일 업로드 중 오류가 발생했습니다.");
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
                    <div className="major-info">
                        <div className="majcreateform-row">
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="학과명"
                                    name="name"
                                    value={major.name}
                                    onChange={(e) => handleFieldChange(e, 'name')}
                                    fullWidth
                                    readOnly={!isEditingMajor}
                                />
                            </div>
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="단과"
                                    name="colCd"
                                    value={major.colCd}
                                    onChange={(e) => handleFieldChange(e, 'colCd')}
                                    fullWidth
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="majcreateform-row">
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="학과 코드"
                                    name="majCd"
                                    value={major.majCd}
                                    onChange={(e) => handleFieldChange(e, 'majCd')}
                                    fullWidth
                                    readOnly
                                />
                            </div>
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="학과 번호"
                                    name="tel"
                                    value={major.tel}
                                    onChange={(e) => handleFieldChange(e, 'tel')}
                                    fullWidth
                                    readOnly={!isEditingMajor}
                                />
                            </div>
                        </div>
                        <div className="majcreateform-row">
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="전체 학점"
                                    name="gradCredit"
                                    value={major.gradCredit}
                                    onChange={(e) => handleFieldChange(e, 'gradCredit')}
                                    fullWidth
                                    readOnly={!isEditingMajor}
                                />
                            </div>
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="전공 학점"
                                    name="reqMajCredit"
                                    value={major.reqMajCredit}
                                    onChange={(e) => handleFieldChange(e, 'reqMajCredit')}
                                    fullWidth
                                    readOnly={!isEditingMajor}
                                />
                            </div>
                            <div className="majcreateform-group">
                                <Input
                                    placeholder="교양 학점"
                                    name="reqGenCredit"
                                    value={major.reqGenCredit}
                                    onChange={(e) => handleFieldChange(e, 'reqGenCredit')}
                                    fullWidth
                                    readOnly={!isEditingMajor}
                                />
                            </div>
                        </div>
                        <div className="actions">
                            {!isEditingMajor ? (
                                <Button
                                    variant="contained"
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                                    onClick={() => setIsEditingMajor(true)}
                                >
                                    수정
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                                    onClick={handleSaveMajor}
                                >
                                    저장
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="majcreateform-group">
                        <FormHelperText>학과장을 선택하세요</FormHelperText>
                        <Select
                            value={headProfessor}
                            onChange={(e) => setHeadProfessor(e.target.value)}
                            Width={"500px"}
                        >

                            {professors.map((professor) => (
                                <MenuItem key={professor.profNo} value={professor.profNo}>
                                    {professor.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            variant="contained"
                            style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                            onClick={() => handleSelectHeadProfessor(headProfessor)}
                            disabled={!isEditingMajor || !headProfessor}
                        >
                            학과장 설정
                        </Button>
                    </div>


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
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                            커리큘럼 등록
                        </Typography>
                        <table className='result-box'>
                            <thead>
                                <th>
                                    <Checkbox
                                        onChange={handleSelectAll}
                                        checked={selectedSubjects.length === subjects.length && subjects.length > 0}
                                    />
                                </th>
                                <th>과목코드</th>
                                <th>학년</th>
                                <th>이수 구분</th>
                                <th>과목명</th>


                            </thead>
                            <tbody>
                                {subjects.map((subject, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Checkbox
                                                checked={selectedSubjects.includes(subject.subCd)}
                                                onChange={(e) => handleCheckboxChange(e, subject.subCd)}
                                            />
                                        </td>
                                        <td>{subject.subCd}</td>
                                        <td>
                                            <Select
                                                value={subject.targetGrd}
                                                onChange={(e) => handleSubjectFieldChange(e, subject.subCd, 'targetGrd')}
                                                disabled={!isEditingSubject || !selectedSubjects.includes(subject.subCd)}
                                            >
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="3">3</MenuItem>
                                                <MenuItem value="4">4</MenuItem>
                                            </Select>
                                        </td>
                                        <td>
                                            <Select
                                                value={subject.type}
                                                onChange={(e) => handleSubjectFieldChange(e, subject.subCd, 'type')}
                                                disabled={!isEditingSubject || !selectedSubjects.includes(subject.subCd)}
                                            >
                                                <MenuItem value="P">필수</MenuItem>
                                                <MenuItem value="S">선택</MenuItem>
                                            </Select>
                                        </td>
                                        <td>
                                            <Input
                                                value={subject.name}
                                                readOnly={!isEditingSubject || !selectedSubjects.includes(subject.subCd)}
                                                onChange={(e) => handleSubjectFieldChange(e, subject.subCd, 'name')}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Select
                                            name="year"
                                            value={newSubject.year}
                                            onChange={handleNewSubjectChange}
                                            fullWidth
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                        </Select>
                                    </td>
                                    <td>
                                        <Select
                                            name="courseType"
                                            value={newSubject.courseType}
                                            onChange={handleNewSubjectChange}
                                            fullWidth
                                        >
                                            <MenuItem value="P">필수</MenuItem>
                                            <MenuItem value="S">선택</MenuItem>
                                        </Select>
                                    </td>
                                    <td>
                                        <Input
                                            placeholder="과목명"
                                            name="subjectName"
                                            value={newSubject.subjectName}
                                            onChange={handleNewSubjectChange}
                                            Width="1000px"
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            style={{ color: 'white', backgroundColor: '#1F3468', marginTop: '10px' }}
                                            onClick={handleAddSubject}
                                        >
                                            등록
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="actions">
                            {!isEditingSubject ? (
                                <Button
                                    variant="contained"
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                                    onClick={() => setIsEditingSubject(true)}
                                >
                                    수정
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    style={{ color: 'white', backgroundColor: '#1F3468', marginRight: '10px' }}
                                    onClick={handleSaveSubjects}
                                >
                                    완료
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                style={{ color: 'white', backgroundColor: '#D9D9D9', marginTop: '10px', marginLeft: '10px' }}
                                onClick={handleDeleteSubjects}
                                disabled={selectedSubjects.length === 0}
                            >
                                삭제
                            </Button>
                        </div>
                    </Paper>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MajorDetail;
