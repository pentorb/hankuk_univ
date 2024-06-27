import { Divider, Radio } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { url } from '../../config/config';
import { useNavigate } from 'react-router';
import { tokenAtom } from '../../atoms';
import { useAtomValue } from 'jotai';
import Swal from "sweetalert2";
import hueFile from "../../assets/huehak.pdf"

const text = {
    display: "flex",
    margin: "10px",
    fontWeight: "bold",
    fontSize: "larger",
    textAlign: "left"
};

const typeMap = {
    p: '출산, 임신 휴학',
    k: '육아 휴학',
    o: '일반 휴학',
    m: '군 휴학',
    s: '창업 휴학',
    i: '질병 휴학'
};

const HueModalByStf = ({ isOpen, toggle, data }) => {
    const token = useAtomValue(tokenAtom);
    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const togggle = () => setIsPdfOpen(!isPdfOpen);
    const [selectedValue, setSelectedValue] = React.useState('APP');
    const [values, setValues] = React.useState({
        rejResult: '',
        status: 'APP'
    });

    const hueOpen = () => {
        setIsPdfOpen(true);
    }

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setValues({ ...values, status: event.target.value });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const alert = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "휴학 상태 변경이 완료되었습니다.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "확인"
        }).then((result) => {
            if (result.isConfirmed) {
                toggle();
                navigate('/staff/confirmHuehak');
            }
        });
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("stdNo", data.stdNo);
        formData.append("type", data.type);
        formData.append("hueSem", data.hueSem);
        formData.append("files", data.files);
        formData.append("reason", data.reason);
        formData.append("status", values.status);
        formData.append("rejResult", values.rejResult);
        formData.append("hueNo", data.hueNo);

        axios.post(`${url}/hueStatus`, formData, { headers: { Authorization: JSON.stringify(token) } })
            .then(res => {
                console.log(res.data);
                navigate('/staff/confirmHuehak');
                // toggle();
                alert(e);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div style={{ position: 'absolute' }}>
            <Modal isOpen={isOpen} toggle={toggle} style={{ width: '630px' }}>
                <ModalHeader toggle={toggle}>{data.hueNo}번 휴학 승인</ModalHeader>
                <ModalBody>
                    <form onSubmit={submit}>
                        <div className="col-12" style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>번호</div>
                                <div>{data.hueNo}</div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>학번</div>
                                <div>{data.stdNo}</div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>이름</div>
                                <div>{data.stdNm}</div>
                            </div>
                        </div>
                        <div className="col-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>단과</div>
                                <div>{data.colNm}</div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>학과</div>
                                <div>{data.colNm}</div>
                            </div>
                            <div className="col-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                <div style={text}>유형</div>
                                <div>{typeMap[data.type] || data.type}</div>
                            </div>
                        </div>
                        <Divider sx={{ margin: 3, borderColor: 'black' }} />
                        <div className="col-12" style={{ marginLeft: '10px', display:'flex', justifyContent:'space-between' }}>
                            <div style={text}>첨부 파일</div>
                            <div onClick={hueOpen} style={{textDecoration:'underline', padding:'15px 15px 0px 0px'}}>김공돌_휴학신청서.pdf</div>
                        </div>

                        <div className="col-12" style={{ marginLeft: '10px' }}>
                            <div style={text}>휴학 사유</div>
                            <div style={{ margin: '10px 30px 20px 10px', padding: '10px', height: '110px', border: '1px solid lightgrey', borderRadius: '10px' }}>{data.reason}</div>
                        </div>
                        {data.files && (
                            <div className="col-12" style={{ marginLeft: '10px' }}>
                                <div style={text}>첨부파일</div>
                                <div style={{ margin: '10px 30px 20px 10px' }}>{data.files}</div>
                            </div>
                        )}
                        <div className="col-12" style={{ marginLeft: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={text}>상태</div>
                            <div style={{ margin: '10px 30px 20px 10px', display: 'flex', alignItems: 'center' }}>
                                <input type="radio" value="APP" checked={selectedValue === 'APP'}
                                    onChange={handleChange} name="status" />&nbsp; 승인 &nbsp; &nbsp;
                                <input type="radio" value="REJ" checked={selectedValue === 'REJ'}
                                    onChange={handleChange} name="status" />&nbsp; 반려
                            </div>
                        </div>
                        {selectedValue === 'REJ' && (
                            <div className="col-12" style={{ marginLeft: '10px' }}>
                                <div style={text}>반려 사유</div>
                                <div style={{ margin: '10px 30px 20px 10px' }}>
                                    <Input id="rejResult" name="rejResult"
                                        placeholder='반려사유를 명확하게 입력해주세요' type="textarea"
                                        style={{ padding: '10px', height: '110px' }} onChange={handleInputChange} />
                                </div>
                            </div>
                        )}
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>취소</Button>
                            <Button color="primary" type="submit">저장</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>

            <Modal isOpen={isPdfOpen} toggle={togggle} >
              <ModalHeader toggle={togggle} isOpen={isPdfOpen} >수업 계획서</ModalHeader>
              <ModalBody>
                <iframe src= {hueFile} width="100%" height="600"></iframe>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={togggle}>
                  닫기
                </Button>
              </ModalFooter>
            </Modal>
        </div>
    );
};

export default HueModalByStf;
