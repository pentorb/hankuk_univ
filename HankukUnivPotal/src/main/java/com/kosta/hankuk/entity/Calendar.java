package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.CalendarDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Calendar {
	@Id
	private String calNo;
	@Column
	private String title;
	@Column
	private String calStartDt;
	@Column
	private String calEndDt;
	@Column
	private Integer allDay;
	@Column
	private String textColor;
	@Column
	private String bgColor;
	@Column
	private String bColor;
	@Column
	private String type;
	@Column
	private String writer;
	
	public CalendarDto toCalendarDto() {
		return CalendarDto.builder()
				.calNo(calNo)
				.title(title)
				.calStartDt(calStartDt)
				.calEndDt(calEndDt)
				.allDay(allDay)
				.textColor(textColor)
				.bgColor(bgColor)
				.bColor(bColor)
				.type(type)
				.writer(writer)
				.build();
	}
}
