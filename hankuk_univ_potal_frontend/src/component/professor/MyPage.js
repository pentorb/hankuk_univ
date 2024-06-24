import { Breadcrumbs, Button, Grid, Link, Paper, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Input, Table } from "reactstrap";
import PersonIcon from '@mui/icons-material/Person';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../config/config";
import { useAtom, useAtomValue } from "jotai";
import { memberAtom, tokenAtom } from "../../atoms";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


const MyPage = () => {
    const [member, setMember] = useAtom(memberAtom);
    const token = useAtomValue(tokenAtom);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        addr: member.addr,
        detailAddr: member.detailAddr,
        postCode: member.postCode,
        tel: member.tel,
        email: member.email,
        emailDo: member.emailDo,
    });

    useEffect(() => {
        setFormValues({
            addr: member.addr,
            detailAddr: member.detailAddr,
            postCode: member.postCode,
            tel: member.tel,
            email: member.email,
            emailDo: member.emailDo
        });
    }, [member]);

    const checkPw = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '비밀번호를 입력하세요',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
                try {
                    const response = await axios.get(`${url}/checkProfPw`, {
                        params: {
                            profNo: member.id,
                            password: password
                        },
                        headers: { Authorization: JSON.stringify(token) }
                    });
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: '비밀번호 확인됨'
                        });
                    } else {
                        Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                    }
                } catch (error) {
                    Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: '정보 수정 완료',
                    text: '입력하신 정보가 성공적으로 변경되었습니다.'
                });
                submit(e);
            }
        });
    }

    const submit = (e) => {
        const formData = new FormData();
        formData.append("id", member.id);
        formData.append("addr", formValues.addr);
        formData.append("detailAddr", formValues.detailAddr);
        formData.append("postCode", formValues.postCode);
        formData.append("tel", formValues.tel);
        formData.append("email", formValues.email);
        formData.append("emailDo", formValues.emailDo);

        axios.post(`${url}/profInfoModify`, formData, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                navigate('/professor/mypage')
                // window.location.reload(); 
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    const updatePw = (e) => {
        Swal.fire({
            title: '현재 비밀번호를 입력해주세요.',
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,

            preConfirm: async (password) => {
                try {
                    const response = await axios.get(`${url}/checkProfPw`, {
                        params: {
                            profNo: member.id,
                            password: password
                        },
                        headers: { Authorization: JSON.stringify(token) }
                    });

                    if (response.status === 200) {
                        // 비밀번호가 일치하면 새로운 비밀번호를 입력받는 함수 호출
                        return showNewPasswordAlert();
                    } else {
                        Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                    }
                } catch (error) {
                    Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    };

    const showNewPasswordAlert = () => {
        return Swal.fire({
            title: '변경하실 비밀번호를 입력해주세요.',
            html: '<input id="newPw" class="swal2-input" placeholder="변경할 비밀번호">',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: '확인',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const newPw = document.getElementById('newPw').value;
                try {
                    const response = await axios.get(`${url}/updateProfPw`, {
                        params: {
                            profNo: member.id,
                            newPw: newPw
                        },
                        headers: { Authorization: JSON.stringify(token) }
                    });

                    if (response.status === 200) {
                        Swal.fire({
                            title: '비밀번호가 변경완료되었습니다.',
                            text: '비밀번호 변경 후 자동으로 로그아웃 되오니 재로그인 해주세요.',
                            timer: 2000,
                            showLoaderOnConfirm: true,
                            confirmButtonText: '확인',
                        }).then(() => {
                            logout();
                            navigate('/');
                        });
                    }
                } catch (error) {
                    Swal.showValidationMessage('비밀번호 변경에 실패했습니다.');
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    };

    const logout = () => {
        setMember(null);
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        // window.location.reload(); 
        // 페이지 새로고침
    }

    const dataChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    return(
        <Grid item xs={12}>
            <Typography ml={18} mt={10} mb={3} variant="h4" color="#444444" gutterBottom><b>계정</b></Typography>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: "auto", overflow: "hidden", width: 1400, margin: "0 auto", borderRadius: 5 }}>
                <div id="breadCrumb" style={{ margin: '24px 40px 32px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                        <Link underline="none" color="inherit" href="/professor/">
                            <HomeIcon />
                        </Link>
                        <Link underline="hover" color="#4952A9">
                            <b>계정</b>
                        </Link>
                    </Breadcrumbs>
                </div>

                <Grid container>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={10} >
                        <form>
                            <div style={{ display: 'flex', marginTop: '20px' }}>
                                <div className='col-4'>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">교수번호</div>
                                        <Input type="text" className='infoD' id='stdNo'
                                            value={member.id} disabled />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">전화번호</div>
                                        <Input type="text" className='infoD'
                                            value={!formValues.tel || formValues.tel === 'null' ? '' : formValues.tel} onChange={dataChange}
                                             name="tel" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">생년월일</div>
                                        <Input type="text" disabled className='infoD' value={member.birthday} />
                                    </div>
                                    
                                    
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">우편번호</div>
                                        <Input type="text" className='infoD' 
                                        value={!formValues.postCode || formValues.postCode === 'null' ? '' : formValues.postCode} onChange={dataChange} 
                                        name="postCode" />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">주소</div>
                                        <Input type="text" className='infoD' 
                                        value={!formValues.addr || formValues.addr === 'null' ? '' : formValues.addr} onChange={dataChange}
                                         name="addr" />
                                    </div>

                                </div>

                                <div className='col-4' style={{ marginLeft: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이름</div>
                                        <Input type="text" disabled className='infoD' value={member.name} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">이메일</div>
                                        <Input type="text" className='infoD' 
                                        value={!formValues.email || formValues.email === 'null' ? '' : formValues.email} onChange={dataChange}
                                         name="email" />@
                                        <Input type="select" className='infoD' 
                                        value={!formValues.emailDo || formValues.emailDo === 'null' ? '' : formValues.emailDo} onChange={dataChange}
                                         name="emailDo" >
                                            <option value=''>선택하세요</option>
                                            <option value='@naver.com'>naver.com</option>
                                            <option value='@gmail.com'>gmail.com</option>
                                            <option value='@kakao.com'>kakao.com</option>
                                            <option value='@daum.net'v>daum.net</option>
                                        </Input>
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="col-3 ttext">학과</div>
                                        <Input type="text" className='infoD' value={member.majName} disabled />
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '49px' }}>
                                        <div className="col-3 ttext">상세주소</div>
                                        <Input type="text" className='infoD' 
                                        value={!formValues.detailAddr || formValues.detailAddr === 'null' ? '' : formValues.detailAddr} onChange={dataChange}
                                         name="detailAddr" />
                                    </div>

                                </div>

                                <div className='col-4 personBG'>
                                    <PersonIcon className='personIcon' style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>
                            <div style={{ margin: '20px 0px 0px 705px' }}>
                                <Button style={{ backgroundColor: '#1F3468', color: 'white' }} onClick={checkPw}>수 정</Button>
                            </div>
                        </form>


                        <div style={{ margin: '30px 0px' }}>
                            <div className="categori">
                                <StopRoundedIcon fontSize='small' /> &nbsp;&nbsp;
                                <span style={{ fontSize: 'x-large' }}><b>비밀번호 변경</b></span>
                            </div>
                            <div style={{ padding: '22px 50px', fontSize: 'larger' }}>
                                비밀번호를 변경하시려면 <b onClick={updatePw} style={{ color: 'blue', textDecoration: 'underline', cursor:'pointer' }}>여기</b>를 클릭하시오
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                </Paper>
        </Grid>
    )
}
export default MyPage;