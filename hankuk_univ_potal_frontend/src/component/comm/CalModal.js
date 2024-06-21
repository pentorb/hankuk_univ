import React from 'react';
import "./css/FullCalendar.css";
import Grid from '@mui/material/Grid';
import EventNoteIcon from '@mui/icons-material/EventNote';
import RoomIcon from '@mui/icons-material/Room';
import Bookmark from '@mui/icons-material/Bookmark';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const ModalTest = props => {
    const categori = {
        display: "flex",
        margin: "10px",
        fontWeight: "bold",
        textAlign: "left",
        color: "#4952A9"
    }

    const text = { display: "flex", alignItems: "center", fontSize: "large" }

    const { open, close, header, start, end, content, type, place } = props

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>

                    <main>


                        <Grid container spacing={1} style={{ padding: "20px" }}>
                            <Grid item xs={12}>
                                <div style={{ paddingBottom: "20px", textAlign: "left", fontWeight: "700", fontSize: "x-large" }}>
                                    {header}
                                </div>
                            </Grid>

                            <Grid item xs={3}>
                                <div style={categori}><EventNoteIcon />&nbsp;일시</div>
                            </Grid>
                            <Grid item xs={9} style={text}>
                                {start} {end}
                            </Grid>


                            <Grid item xs={3}>
                                <div style={categori}><RoomIcon />&nbsp;장소</div>
                            </Grid>
                            <Grid item xs={3} style={text}>
                                {place}
                            </Grid>

                            <Grid item xs={3}>
                                <div style={categori}><Bookmark />&nbsp;분류</div>
                            </Grid>
                            <Grid item xs={3} style={text}>
                                {type}
                            </Grid>

                            <Grid item xs={12}>
                                <div style={categori}><DriveFileRenameOutlineIcon />&nbsp;메모</div>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <div className="memo">
                                        {content === "undefined" || !content ? '' : content}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </main>

                    <footer>
                        <button className="close" onClick={close}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default ModalTest;