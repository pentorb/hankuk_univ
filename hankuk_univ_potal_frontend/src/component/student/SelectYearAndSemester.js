import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Button } from '@mui/material';

export default function SelectYearAndSemester({semester, setSemester, year, setYear}) {

    return (
        <Grid container>
            <Grid item xs={12} sx={{ height: 50}}/>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin:"0 auto", marginRight:4 }} size="small">
                        <Select
                            id="demo-select-small"
                            value={year}
                            onChange={(event) => setYear(event.target.value)}
                        >                        
                            <MenuItem value={1}>1학년</MenuItem>
                            <MenuItem value={2}>2학년</MenuItem>
                            <MenuItem value={3}>3학년</MenuItem>
                            <MenuItem value={4}>4학년</MenuItem>
                        </Select>                    
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 250, float: "left", margin:"0 auto", marginRight:4 }} size="small">   
                        <Select
                            id="demo-select-small"
                            value={semester}                        
                            onChange={(event) => setSemester(event.target.value)}
                        >
                            <MenuItem value={1}>1학기</MenuItem>
                            <MenuItem value={2}>2학기</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" size="large" sx={{margin:"0 auto", backgroundColor:"firstColor.main" }}>조회</Button>
                </div>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={12} sx={{ height: 50}}/>
        </Grid>
        
    );
}