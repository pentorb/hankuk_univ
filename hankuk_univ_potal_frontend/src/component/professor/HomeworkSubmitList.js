import { Button, Input, Table } from 'reactstrap';
import './prof.css';

const HomeworkSubmitList = () => {
    return (
        <div className='HomeworkSubmitList_body'>
            <div className='HomeworkSubmitList_Title'>📓공업수학 1주차 과제란</div>
            <div className='HomeworkSubmitList_Div_Button'>
            <Button
                    className='HomeworkSubmitList_Button'
                >
                    점수저장
            </Button>
            </div>
            <div className='HomeworkSubmitList_Div_Table'>
            <Table className='HomeworkSubmitList_Table' hover striped>
                <thead>
                    <tr>
                        <th>
                            학번
                        </th>
                        <th>
                            학과
                        </th>
                        <th>
                            이름
                        </th>
                        <th>
                            과제첨부파일
                        </th>
                        <th>
                            제출일자
                        </th>
                        <th>
                            점수
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <th scope="row">
                            201701563
                        </th>
                        <td>
                            항공전자공학과
                        </td>
                        <td>
                            홍하준
                        </td>
                        <td>
                            201701563_홍하준.pdf
                        </td>
                        <td>
                            2024-06-02
                        </td>
                        <td>
                            <Input 
                                className='HomeworkSubmitList_Input'
                                type='text' />
                        </td>
                    </tr><tr>
                        <th scope="row">
                            201701563
                        </th>
                        <td>
                            항공전자공학과
                        </td>
                        <td>
                            홍하준
                        </td>
                        <td>
                            201701563_홍하준.pdf
                        </td>
                        <td>
                            2024-06-02
                        </td>
                        <td>
                            <Input 
                                className='HomeworkSubmitList_Input'
                                type='text' />
                        </td>
                    </tr><tr>
                        <th scope="row">
                            201701563
                        </th>
                        <td>
                            항공전자공학과
                        </td>
                        <td>
                            홍하준
                        </td>
                        <td>
                            201701563_홍하준.pdf
                        </td>
                        <td>
                            2024-06-02
                        </td>
                        <td>
                            <Input 
                                className='HomeworkSubmitList_Input'
                                type='text' />
                        </td>
                    </tr>
                    
                </tbody>
            </Table>
            </div>
        </div>
    )
}
export default HomeworkSubmitList;