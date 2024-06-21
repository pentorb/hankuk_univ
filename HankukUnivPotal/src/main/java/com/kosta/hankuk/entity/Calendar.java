package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.CalendarDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Calendar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer calNo;
	@Column
	private String title;
	@Column
	private String content;
	@Column
	private String start;
	@Column
	private String end;
	@Column
	private String place;
	@Column
	private String bgColor;
	@Column
	private String groupId;
	@Column
	private String writer;
	@Column
	private Boolean allDay;
	
	public CalendarDto toCalendarDto() {
		return CalendarDto.builder()
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
