import React, { useState } from 'react';
import './prof.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const LectureList = ({ direction, ...args }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
    return (
        <div className='container_body'>
            <div >
                <Dropdown isOpen={dropdownOpen} toggle={toggle}
                    style={{ display: 'inline-block', marginLeft: '295px' }} >
                    <DropdownToggle caret color='white' className='Dropdown'>개설년도</DropdownToggle>
                    <DropdownMenu >
                        <DropdownItem className='Dropdown'>2024</DropdownItem>
                        <DropdownItem className='Dropdown'>2023</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={dropdownOpen1} toggle={toggle1} style={{ display: 'inline-block' }}>
                    <DropdownToggle caret color='white' className='Dropdown'>승인여부</DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem className='Dropdown'>승인</DropdownItem>
                        <DropdownItem className='Dropdown'>신청</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    className='Button_Lecture'
                >
                    조회
                </Button>
                <Button
                    className='Button_Lecture'
                >
                    등록
                </Button>
            </div>
            <div className='table_body'>
                <div>
                    <div className='thead' style={{ marginLeft: '50px', marginRight: '50px' }}>개설년도</div>
                    <div className='thead' style={{ marginLeft: '20px', marginRight: '90px' }}>학기</div>
                    <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>과목</div>
                    <div className='thead' style={{ marginLeft: '150px', marginRight: '100px' }}>상태</div>
                </div>

                <div className='table_tr'>
                    <div className='table_td td1' style={{ marginLeft: '50px', marginRight: '50px' }}>개설년도</div>
                    <div className='table_td' style={{ marginLeft: '20px', marginRight: '90px' }}>학기</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>과목</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>상태</div>
                </div>

                <div className='table_tr'>
                    <div className='table_td td1' style={{ marginLeft: '50px', marginRight: '50px' }}>개설년도</div>
                    <div className='table_td' style={{ marginLeft: '20px', marginRight: '90px' }}>학기</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>과목</div>
                    <div className='table_td' style={{ marginLeft: '150px', marginRight: '100px' }}>상태</div>
                </div>



            </div>
        </div>
    )
}
export default LectureList;