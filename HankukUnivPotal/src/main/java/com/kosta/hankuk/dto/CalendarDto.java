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
	private String calNo;
	private String title;
	private String calStartDt;
	private String calEndDt;
	private String div;
	private Integer allDay;
	private String textColor;
	private String bgColor;
	private String bColor;
	private String writer;
	
	public Calendar Calendar() {
		return Calendar.builder()
				.calNo(calNo)
				.title(title)
				.calStartDt(calStartDt)
				.calEndDt(calEndDt)
				.allDay(allDay)
				.textColor(textColor)
				.bgColor(bgColor)
				.bColor(bColor)
				.div(div)
				.writer(writer)
				.build();
	}
	
}
