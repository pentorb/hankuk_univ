import { useEffect, useState } from "react";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { url } from '../../config/config';

const renderEventContent = (eventInfo) => {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    );
};

// '일' 제거 해주는 함수 
const daycheck = (info) => {
    var number = document.createElement("a");
    number.classList.add("fc-daygrid-day-number");
    number.innerHTML = info.dayNumberText.replace("일", "");
    if (info.view.type === "dayGridMonth") {
        return {
            html: number.outerHTML
        };
    }
    return {
        domNodes: []
    };
}


const UnivCal = () => {
    const [events, setEvents] = useState([]);
    const token = useAtomValue(tokenAtom);

    useEffect(()=>{
        axios.get(`${url}/calendar?id=S241234`, { headers: { Authorization: JSON.stringify(token) } })
        .then(res => {

            const formattedEvents = res.data.map(event => {
                const isAllDay = event.allDay;
                if (isAllDay) {
                    return {
                        title: event.title,
                        start: new Date(event.start),
                        end: new Date(event.end),
                        backgroundColor: event.bgColor,
                        textColor: '#000000',
                        borderColor: event.bgColor,
                        allDay: isAllDay,
                        extendedProps: {
                            content: event.content,
                            // type: getGroupName(event.groupId),
                            place: event.place,
                            writer: event.writer
                        }
                    };
                } else {
                    return {
                        title: event.title,
                        start: new Date(event.start),
                        end: new Date(event.end),
                        backgroundColor: event.bgColor,
                        textColor: '#000000',
                        borderColor: event.bgColor,
                        extendedProps: {
                            content: event.content,
                            // type: getGroupName(event.groupId),
                            place: event.place,
                            writer: event.writer
                        }
                    };
                }
            });

            
            setEvents(formattedEvents);
            console.log(formattedEvents);
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
    }, [token])

    return (
        <>
            <div style={{ padding: '20px 20px 10px 20px', margin: '0 200px' }}>

            <div style={{ fontSize: '25px', fontWeight: '600' }}>이달의 일정 </div>
                <div style={{ backgroundColor: '#F5F5F5', borderRadius: '16px', margin: '10px 0 50px' }}>
                    <div style={{padding:'20px 30px'}}>
                        <div>중간고사</div>
                        <div>중간고사</div>
                        <div>중간고사</div>
                        <div>중간고사</div>
                        <div>중간고사</div>
                    </div>
                </div>

                <div style={{ marginBottom: '50px' }}>
                    <FullCalendar
                        headerToolbar={{
                            left: "prev",
                            center: "title",
                            right: "next",
                        }}
                        defaultView="dayGridMonth"
                        locale={'ko'}
                        dayCellContent={daycheck}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        events={events}
                        eventContent={renderEventContent}
                        dayMaxEventRows={true}
                        dayMaxEvents={2}
                        contentHeight={700}
                    />
                </div>

                

            </div>
        </>
    )
}

export default UnivCal;