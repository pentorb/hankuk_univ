package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Calendar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CalendarDto {
	private Integer calNo;
	private String title;
	private String content;
	private String end;
	private String start;
	private String groupId;
	private String bgColor;
	private String writer;
	private String place;
	private Boolean allDay;
	
	public Calendar toCalendar() {
		return Calendar.builder()
				.calNo(calNo)
				.title(title)
				.start(start)
				.end(end)
				.bgColor(bgColor)
				.groupId(groupId)
				.writer(writer)
				.place(place)
				.allDay(allDay)
				.content(content)
				.build();
	}
	
}
