import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const Example = () => {









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

          </table>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Example;